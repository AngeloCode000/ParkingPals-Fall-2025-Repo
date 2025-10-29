const readline = require('readline');

class Menu {
  constructor({ userData, parkingData, authorization, algorithm, inputData }) {
    this.userData = userData;
    this.parkingData = parkingData;
    this.authorization = authorization;
    this.algorithm = algorithm;
    this.inputData = inputData;
    this.currentUser = null;
  }

  async start() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
    const ask = (q) => new Promise((res) => rl.question(q, res));

    const help = () => {
      console.log('Commands:');
      console.log('  help                  Show this help');
      console.log('  login <campusID>      Log in as user');
      console.log('  whoami                Show current user');
      console.log('  lots                  Show lot summary');
      console.log('  recommend             Recommend a lot (commuter)');
      console.log('  checkin <lotId>       Check into a lot');
      console.log('  checkout              Check out of current lot');
      console.log('  refresh               Update occupancy from input data');
      console.log('  users                 [admin] List users');
      console.log('  setlot <id> <total> <open>  [admin] Update lot counts');
      console.log('  exit                  Quit');
    };

    const printSummary = () => {
      const s = this.parkingData.summary();
      console.log(`Total: ${s.totalSpots}, Open: ${s.openSpots}, Filled: ${s.filledSpots}`);
      for (const l of s.lots) {
        console.log(` - ${l.id} (${l.name}): ${l.openSpots}/${l.totalSpots} open`);
      }
    };

    console.log('ParkingPals CLI. Type "help" to see commands.');
    rl.prompt();

    for await (const line of rl) {
      const [cmd, ...args] = line.trim().split(/\s+/);
      try {
        switch ((cmd || '').toLowerCase()) {
          case '':
            break;
          case 'help':
            help();
            break;
          case 'login': {
            const id = args[0];
            const user = this.authorization.login(id, this.userData);
            if (!user) console.log('User not found.');
            else {
              this.currentUser = user;
              console.log(`Logged in as ${user.name} (${user.checkAdmin() ? 'admin' : 'commuter'})`);
            }
            break;
          }
          case 'whoami':
            if (this.currentUser) console.log(`${this.currentUser.name} [${this.currentUser.campusID}]`);
            else console.log('Not logged in.');
            break;
          case 'lots':
            printSummary();
            break;
          case 'recommend': {
            if (!this.currentUser) { console.log('Login first.'); break; }
            const lotId = this.algorithm.recommendLot(this.currentUser, this.parkingData);
            console.log(lotId ? `Recommended: ${lotId}` : 'No recommendation available.');
            break;
          }
          case 'checkin': {
            if (!this.currentUser || !this.currentUser.checkIn) { console.log('Login as commuter.'); break; }
            const lotId = args[0];
            const ok = this.currentUser.checkIn(lotId, this.parkingData);
            console.log(ok ? `Checked into ${lotId}` : 'Check-in failed.');
            break;
          }
          case 'checkout': {
            if (!this.currentUser || !this.currentUser.checkOut) { console.log('Login as commuter.'); break; }
            const lotId = this.currentUser.lot?.[0];
            if (!lotId) { console.log('Not in a lot.'); break; }
            const ok = this.currentUser.checkOut(lotId, this.parkingData);
            console.log(ok ? `Checked out of ${lotId}` : 'Check-out failed.');
            break;
          }
          case 'refresh': {
            await this.algorithm.predictOccupancy(this.parkingData, this.inputData);
            printSummary();
            break;
          }
          case 'users': {
            if (!this.currentUser || !this.authorization.isAdmin(this.currentUser)) { console.log('Admin only.'); break; }
            for (const u of this.userData.listUsers()) {
              console.log(` - ${u.campusID}: ${u.name} (${u.checkAdmin() ? 'admin' : 'commuter'})`);
            }
            break;
          }
          case 'setlot': {
            if (!this.currentUser || !this.authorization.isAdmin(this.currentUser)) { console.log('Admin only.'); break; }
            const [id, totalStr, openStr] = args;
            const lot = this.parkingData.getLot(id);
            if (!lot) { console.log('Unknown lot'); break; }
            const total = Number(totalStr);
            const open = Number(openStr);
            if (Number.isFinite(total) && Number.isFinite(open)) lot.setSpotInfo(total, open);
            printSummary();
            break;
          }
          case 'exit':
          case 'quit':
            rl.close();
            return;
          default:
            console.log('Unknown command. Type "help".');
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
      rl.prompt();
    }
  }
}

module.exports = { Menu };

