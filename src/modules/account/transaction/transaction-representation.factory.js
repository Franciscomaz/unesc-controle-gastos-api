module.exports = {
  fromEntity: entity => {
    return {
      id: entity.id,
      nome: entity.nome,
      valor: entity.valor,
      tipo: entity.tipo,
      categoria: entity.categoria,
      conta: entity.conta
    };
  }
};
