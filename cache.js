class SimpleCache {
  cache = {};
  getSecret;
  constructor(getSecret) {
    this.getSecret = getSecret;
  }
  async get(key) {
    if (this.cache[key]) {
      return this.cache[key];
    }
    const res = await this.getSecret();
    if (res[key]) {
      this.cache = res;
      return res[key];
    }
  }
}

module.exports = { SimpleCache };
