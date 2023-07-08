

export default async function getInformation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const devs = ["Amós", "Wesley"];
            if (devs) {
                resolve(devs);
            } else {
                reject("Não foi possível obter a string.");
            }
        }, 50)
    })

}