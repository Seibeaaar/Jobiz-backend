export const nameRegex = /^[a-z ,.'-]+$/i;

export const constructRegex = (params: string[]) =>
  new RegExp(params.join("|"), "gi");
