import dbClient from "./db";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export type User = {
  id: string;
  shopify_id?: string;
  firstName: string;
  lastName?: string;
  password?: string;
  email: string;
  phone?: string;
  country_code?: string;
  created_at?: Date;
  picture?: string;
};

const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, SALT_ROUNDS)
      .then((hash) => {
        resolve(hash);
      })
      .catch(reject);
  });
};

const validatePassword = async (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hash)
      .then((res) => {
        console.log(res); // return true
        resolve(res);
      })
      .catch(reject);
  });
};

export const createTable = async () => {
  return dbClient.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("shopify_id", "varchar(50)")
    .addColumn("firstName", "varchar(100)")
    .addColumn("lastName", "varchar(100)")
    .addColumn("email", "varchar(255)")
    .addColumn("password", "varchar(255)")
    .addColumn("phone", "varchar(12)")
    .addColumn("country_code", "varchar(5)")
    .addColumn("created_at", "timestamp")
    .addColumn("picture", "varchar(255)")
    .execute();
};

export const login = async (email: string, password: string) => {
  const res = await getUserByEmail(email);
  const isValid = await validatePassword(password, res.password);
  if (isValid) {
    delete res.password;
    return res;
  }
  return null;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  return dbClient
    .selectFrom("users")
    .select([
      "id",
      "firstName",
      "lastName",
      "email",
      "phone",
      "country_code",
      "password",
      "picture",
    ])
    .where("email", "=", email)
    .executeTakeFirstOrThrow()
    .then((r) => {
      return {
        ...r,
        name: `${r.firstName} ${r.lastName}`,
      };
    });
};

export const getUser = async (id: string): Promise<User> => {
  return dbClient
    .selectFrom("users")
    .select(["id", "firstName", "lastName", "email", "phone", "country_code"])
    .where("id", "=", id)
    .executeTakeFirstOrThrow()
    .then((r) => {
      return {
        ...r,
        name: `${r.firstName} ${r.lastName}`,
      };
    });
};

export const insertNewUser = async (user: User) => {
  const res = await dbClient
    .insertInto("users")
    .values({
      ...user,
      password: await hashPassword(user.password),
      created_at: new Date(),
    })
    .execute();
  return res;
};

export const updateNewUser = async (user: User) => {
  const res = await dbClient.insertInto("users").values(user).execute();
  return res;
};
