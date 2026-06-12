export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '') // remove não números
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // limita o tamanho
};

export const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskPhone = (value: string) => {
  let v = value.replace(/\D/g, '');
  if (v.length <= 10) {
    // Fixo (99) 9999-9999
    return v
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  } else {
    // Celular (99) 99999-9999
    return v
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }
};

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export const maskCidadeEstado = (value: string) => {
  // Ex: "Maceió / AL"
  // Permite digitar letras, espaços e barra. Transforma a uf em maiúscula após a barra.
  let v = value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s\/]/g, '');
  // Se o usuário digitar "Maceió AL", podemos forçar a colocar "/ "
  // Mas de forma mais simples, apenas deixamos a pessoa digitar a formatação livremente 
  // e aplicar uppercase se tiver 2 caracteres após barra ou espaço.
  // Uma máscara inteligente:
  if (v.includes('/')) {
    const parts = v.split('/');
    const cidade = parts[0].replace(/\s+$/, ''); // trim end
    let uf = parts[1].replace(/\s/g, '').substring(0, 2).toUpperCase();
    return `${cidade} / ${uf}`;
  }
  return v;
};

export const maskNome = (value: string) => {
  // Apenas letras e espaços, capitalizando cada palavra
  let v = value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]/g, '');
  return v.replace(/\b\w/g, l => l.toUpperCase());
};

export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
