const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

class BaseRepository {
    constructor(fileName) {
        this.filePath = this.getFilePath(fileName);
    }

    getAll = async () => {
        return JSON.parse(await fs.promises.readFile(this.filePath, { encoding: "utf8", flag: "r" }));
    }

    getOne = async (id) => {
        const records = await this.getAll();
        return records.find(item => item.id === id);
    }

    getOneBy = async (filters) => {
        const records = await this.getAll();
        for (let record of records) {
            let found = true;
            for (let item in filters) {
                if (record[item] !== filters[item]) {
                    found = false
                }
            }
            if (found) {
                return record;
            }
        }
    }

    create = async (attrs) => {
        attrs.id = this.generateRandom(10);
        const content = await this.getAll();
        content.push(attrs);
        await this.writeAll(content);
        return attrs;
    }

    update = async (id, attrs) => {
        const records = await this.getAll();
        const record = records.find(item => item.id === id);
        if (!record) {
            throw new Error(`record with ${id} not found!`);
        }
        Object.assign(record, attrs);
        this.writeAll(records);
    }

    delete = async (id) => {
        const records = await this.getAll();
        const filteredRecords = records.filter(item => item.id !== id);
        await this.writeAll(filteredRecords);
    }

    generateRandom = (numberOfBytes) => {
        return crypto.randomBytes(numberOfBytes).toString("hex");
    }

    getFilePath = (fileName) => {
        const filePath = path.join(path.join(__filename, "../../datastore"), fileName);
        if (!fs.existsSync(filePath)) {
            console.log("create file at: ", filePath);
            fs.writeFileSync(filePath, "[]");
        }
        return filePath;
    }

    writeAll = async (content) => {
        await fs.promises.writeFile(this.filePath, JSON.stringify(content, null, 4));
    }
}

module.exports = BaseRepository;