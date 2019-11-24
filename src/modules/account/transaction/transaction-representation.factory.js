module.exports = {
  fromEntity: entity => {
    return {
      id: entity.id,
      nome: entity.nome,
      valor: entity.valor,
      tipo: entity.tipo,
      categoria: entity.categoria
        ? {
            id: entity.categoria.id,
            nome: entity.categoria.nome
          }
        : null,
      conta: entity.conta
        ? {
            id: entity.conta.id,
            nome: entity.conta.nome
          }
        : null
    };
  }
};
