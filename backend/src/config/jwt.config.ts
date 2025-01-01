class JWT_CONFIG {
  config = {
    global: true,
    secret: process.env.SECRET_JWT,
    signOptions: { expiresIn: '60s' },
  };
}

export default new JWT_CONFIG().config;
