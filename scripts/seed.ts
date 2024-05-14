const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "NextJS"},
                { name: "Svelete"},
                { name: "JavaScript"},
                { name: "Rust"},
                { name: "Python"},
                { name: "C++"},
                { name: "Java"},
            ]
        })

        console.log("success")
    } catch (error) {
        console.log("Error seeding the database categories" , error)
    } finally {
        await database.$disconnect();
    }
}

main();