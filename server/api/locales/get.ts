const fs = require("fs");
const get = async (ctx, next) => {
  //get all the namespaces, stick them together, serve!
  let localeData = {};
  fs.readdirSync(`${__dirname}/${ctx.params.lng}`).forEach(filename => {
    let content = fs.readFileSync(`${__dirname}/${ctx.params.lng}/${filename}`);
    localeData[filename.substring(0, filename.length - 5)] = JSON.parse(
      content
    );
  });

  ctx.body = localeData;
  next();
};

module.exports = get;
