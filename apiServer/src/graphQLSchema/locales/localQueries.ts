import { resolve } from "url";

const fs = require("fs");

const findAllNss = async (langid: String) => {
  //get all the namespaces, stick them together, serve!
  let namespacesArray: any = []; //TODO: key is dynamic, how to declare this for typescript?
  fs.readdirSync(`${__dirname}/${langid}`).forEach((filename: String) => {
    let content = fs.readFileSync(`${__dirname}/${langid}/${filename}`, "utf8");
    let namespaceName = filename.substring(0, filename.length - 5);
    let contentObject = JSON.parse(content);
    namespacesArray.push({
      name: namespaceName,
      translations: JSON.stringify(contentObject)
    });
  });
  return namespacesArray;
};

const findNsById = async ({
  langid,
  namespace
}: {
  langid: String;
  namespace: String;
}) => {
  let content = fs.readFileSync(
    `${__dirname}/${langid}/${namespace}.json`,
    "utf8"
  );
  let contentObject = JSON.parse(content);
  return {
    name: namespace,
    translations: JSON.stringify(contentObject)
  };
};

//check if dir exists
const getDirStats = ({ langid }: { langid: String }) => {
  return new Promise((resolve, reject) => {
    fs.stat(`${__dirname}/${langid}`, function(err: Error, stats: {}) {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

const findLangById = async ({ langid }: { langid: String }) => {
  try {
    await getDirStats({ langid });
    return {
      langid: langid
    };
  } catch (err) {
    throw new Error(`Langid "${langid}" does not exist`);
  }
};

const isDirectory = (source: String) => {
  return fs.lstatSync(`${__dirname}/${source}`).isDirectory();
};

const findAllLangs = async () => {
  let langsArray: any = []; //TODO: key is dynamic, how to declare this for typescript?
  langsArray = fs
    .readdirSync(__dirname)
    .filter(isDirectory)
    .map((dir: String) => {
      return {
        langid: dir
      };
    });

  return langsArray;
};

export default {
  findLangById,
  findAllLangs,
  findNsById,
  findAllNss
};
