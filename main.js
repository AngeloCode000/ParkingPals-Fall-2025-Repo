// Entry for the JavaScript implementation.
// Wires up the CLI Runner which assembles domain + services.

const { main } = require('./src/cli/Runner');

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
