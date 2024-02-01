const request = require("supertest");
const server = require("../index");
const app = require("../index");
const jwt = require("jsonwebtoken");

//1
/*Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
es un arreglo con por lo menos 1 objeto. (3 Puntos) */

describe("/GET cafes", () => {
  it("should respond whit a 200 status code", async () => {
    const response = await request(app).get("/cafes").send();
    expect(response.statusCode).toBe(200);
  });

  it("should respond whit a Object", async () => {
    const id = Math.floor(Math.random() * 999);
    const testCafe = {
      id: id,
      cafe: "new cafe",
    };
    const addNewCafe = await request(app).post("/cafes").send(testCafe);
    const response = await request(app)
      .get("/cafes/" + id)
      .send();
    expect(response.body).toBeInstanceOf(Object);
  });
});

//2
/*Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que
no existe. (2 Puntos)
 */

describe("DELETE /cafes/:id", () => {
  const id = Math.floor(Math.random() * 999);
  //función para generar un token
  const generateToken = (id) => {
    return jwt.sign({ id }, "secret_key");
  };

  const testCafe = {
    id: id,
    cafe: "new cafe",
  };
  const token = generateToken(id);
  it("should respond whit a 404 status code", async () => {
    const addNewCafe = await request(app).post("/cafes").send(testCafe);
    const response = await request(app)
      .delete("/cafes/invaledId")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });
});

//3
/*Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201. (2
Puntos)
 */

describe("POST /Cafes", () => {
  const id = Math.floor(Math.random() * 999);
  const testCafe = {
    id: id,
    cafe: "new cafe",
  };

  it("should respond whit a 201 status code", async () => {
    const addNewCafe = await request(app).post("/cafes").send(testCafe);
    expect(addNewCafe.statusCode).toBe(201);
  });
});

//4
/*Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
café enviando un id en los parámetros que sea diferente al id dentro del payload.
(3 Puntos) */

describe("PUT /cafes", () => {
  const id = Math.floor(Math.random() * 999);
  const testCafe = {
    id: id,
    cafe: "new cafe",
  };

  it("should respond whit a 400 status code", async () => {
    const addNewCafe = await request(app).post("/cafes").send(testCafe);
    const response = await request(app).put("/cafes/invaledId").send();
    expect(response.statusCode).toBe(400);
  });
});
