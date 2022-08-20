function validateEnvironment(obj: { [name: string]: string }) {
  const [name, type] = Object.entries(obj)[0];
  const environment = process.env[`REACT_APP_${name}`];

  if (typeof environment === 'undefined')
    throw Error(`환경변수 ${name}의 값을 설정해주세요!`);
  if (type === 'number') {
    const numberedEnv = Number(environment);
    if (isNaN(numberedEnv))
      throw Error(`환경변수 ${name}의 값이 ${type} 값이 될 수 없습니다`);

    return numberedEnv;
  }

  return environment;
}

export const GITHUB_ID = validateEnvironment({ GITHUB_ID: 'string' }) as string;
