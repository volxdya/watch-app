export abstract class Service<T = any> {
  constructor(private readonly repository: T) {}
  
  getAll() {
    return 'qwe';
  }

  test() {
    return 'test';
  }
}
 