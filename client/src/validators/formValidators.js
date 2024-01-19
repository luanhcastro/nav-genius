export const validateEmail = (rule, value) => {
    if (value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)) {
      return Promise.reject('Por favor, insira um endereço de email válido.');
    }
    return Promise.resolve();
  };
  
  export const validatePhone = (rule, value) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject('Por favor, insira apenas números para o telefone.');
    }
    return Promise.resolve();
  };
  
  export const validateName = (rule, value) => {
    if (value && !/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
      return Promise.reject('Por favor, insira apenas letras para o nome.');
    }
    return Promise.resolve();
  };
  