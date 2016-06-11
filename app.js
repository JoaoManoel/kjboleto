var express = require('express');
var cors = require('cors');
var helmet = require('helmet');
var bodyParser = require('body-parser');

var Boleto = require('node-boleto').Boleto;

var app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/gerarBoleto', function(req, res) {
  var boletoJson = req.body;

  boletoJson.data_emissao = new Date(boletoJson.data_emissao);
  boletoJson.data_vencimento = new Date(boletoJson.data_vencimento);
  boletoJson.valor = parseInt(boletoJson.valor);

  var boleto = new Boleto(boletoJson);

  boleto.renderHTML(function(html) {
    res.json({boletoHTML: html});
  });
});

app.listen(3003);
console.log("Listening on port 3003");
