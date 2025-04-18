(function () {
  if (typeof require !== 'undefined') {
    const currentRecord = require('N/currentRecord');
    const rec = currentRecord.get();
    console.log('[✅ Extensión] Record ID:', rec.getValue({ fieldId: 'id' }));
  } else {
    console.warn('[❌ Extensión] require no está definido');
  }
})();