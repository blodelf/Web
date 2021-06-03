
export const text = (target) => {
    const value = target.value;
    return /^[a-zA-Z0-9_-]+[ a-zA-Z0-9_-]*$/.test(value);
}

export const URL = (target) => {
const value = target.value;
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(value);
}

export const num = (target) => {
    const value = target.value;
    return /^\d+$/.test(value);
}

export const req = (target) => {
    return target.value.length > 0;
}

