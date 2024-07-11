export default () => ({
  /**
   * 数据库连接配置
   */
  db: {
    host: 'localhost', // 数据库ip地址
    port: 3306, // 端口
    username: 'root', // 登录名
    password: '123456', // 密码
    database: 'miniproject', // 数据库名称
  },

  /**
   * redis配置单库
   */
  redisConfig: {
    port: 6379,
    host: '127.0.0.1',
    password: '123456',
    db: 0,
  },
  /**
   * redis配置集群
   */
  redisClusterConfig: [
    {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 1,
    },
    {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 2,
    },
  ],

  /**
   * Jwt生成密钥
   */
  jwtSecret: 'hard!to-guess_secretqwesdasd',
  /**
   * jwtExpiresIn jwt的过期时间
   * jwtLoginExpiresIn (单位s)jwt在redis中的过期时间、为了避免重复登录重复生成token与jwtExpiresIn一致
   */
  jwtExpiresIn: '7d',
  jwtLoginExpiresIn: 604800,

  /**
   * 阿里云短信配置 下面的数据可在相关云服务上面获得
   */
  aliKey: {
    AccessKeyID: 'LTAI5tKwjywcZzacyzQuB28N1',
    AccessKeySecret: 'Zn6uwRdzhuvEx05vBFLqM5DNz0Ezsa1',
    SignName: '快速学习发送', // 短信签名名称
    TemplateCode: 'SMS_460700600', // 短信模版CODE
  },

  maxMessage: 15, // 一天内单个手机号最大短信发送次数

  /**
   * 小程序appid和密钥
   */
  wxAPPID: 'wx08ea58efde855621',
  wxAPPSecret: '6eae600ef478f090db0b43d34e932e481',
});
