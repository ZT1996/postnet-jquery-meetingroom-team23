let express = require('express');
let {TranslateBarcodeToZipcode} = require('./main/barcode-to-zipcode');
let {TranslateZipcodeToBarcode} = require('./main/zipcode-to-barcode');
let app = express();
app.use(express.static('./', {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'js', 'css'],
  index: ['index.html'], // or `false`
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}));

app.get('/zipcode-to-barcode/:id', function(req, res) {
  let translateZipcodeToBarcode = new TranslateZipcodeToBarcode();
  let barcode = translateZipcodeToBarcode.translate(req.params.id);
  if(barcode.text !== false) {
    res.status(200).send(barcode.text);
  }else {
    res.sendStatus(400).end();
  }
});

app.get('/barcode-to-zipcode/:id', function(req, res) {
  let translateBarcodeToZipcode = new TranslateBarcodeToZipcode();
  let zipcode = translateBarcodeToZipcode.translate(req.params.id);
  if(zipcode.text !== false){
    res.status(200).send(zipcode.text);
  }else {
    res.sendStatus(400).end();
  }
});

app.listen(4000, function() {
  console.log('server is listening on 4000');
});