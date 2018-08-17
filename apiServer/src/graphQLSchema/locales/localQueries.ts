const fs = require("fs");

const findAllNss = async (langid: String) => {
  console.log("local querie!!!!!!!!!", langid);
  //get all the namespaces, stick them together, serve!
  let localeData: any = {}; //TODO: key is dynamic, how to declare this for typescript?
  fs.readdirSync(`${__dirname}/${langid}`).forEach((filename: String) => {
    let content = fs.readFileSync(`${__dirname}/${langid}/${filename}`);
    localeData[filename.substring(0, filename.length - 5)] = JSON.parse(
      content
    );
  });
  console.log("returning local data!!!!!", localeData);
  return localeData;
};

const findNsById = async ({
  langid,
  namespace
}: {
  langid: String;
  namespace: String;
}) => {
  let content = fs.readFileSync(`${__dirname}/${langid}/${namespace}.json`);
  return content;
};

//check if dir exists
const findLangById = async ({ langid }: { langid: String }) => {
  fs.stat(directory, function(err, stats) {
    //Check if error defined and the error code is "not exists"
    if (err && err.errno === 34) {
      //Create the directory, call the callback.
      fs.mkdir(directory, callback);
    } else {
      //just in case there was a different error:
      callback(err);
    }
  });
  return content;
};

export default {
  findLangById,
  findNsById,
  findAllNss
};
