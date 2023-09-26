exports = function() {
  // Criando um objeto JavaScript

  const valorDecimal = 1.55621;

  const data = {
    message: valorDecimal
  };



  // Convertendo o objeto em formato JSON
  const jsonString = JSON.stringify(data);
  return jsonString;
};