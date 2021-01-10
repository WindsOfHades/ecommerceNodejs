module.exports = (errors, inputElement) => {
    try {
        if (errors) {
            return errors.mapped()[inputElement].msg;
        }
        return "";
    } catch (err) {
        return "";
    }
}