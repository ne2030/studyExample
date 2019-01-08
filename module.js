async function a(params) {
    const v = await Promise.resolve(1);
    module.exports = v;
}

a();
