export class AuthResult {
  accessToken: string;

  constructor(data: any) {
    this.accessToken = data?.access_token;
  }
}