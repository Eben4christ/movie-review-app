const { isValidObjectId } = require("mongoose");
const passwordResetToken = require("../model/passwordResetToken");
const { sendError } = require("../utils/helper");

exports.isValidPassResetToken = async (req, res, next) => {
    const { token, userId } = req.body;


    if(!token.trim() || !isValidObjectId(userId)) return sendError(res, "Inavalid request!")
    const resetToken = await passwordResetToken.findOne({owner: userId})
    if(!resetToken) return sendError(res, "Unauthorized access, invalide token!")

    const matched = await resetToken.compareToken(token)
    if(!matched) return sendError(res, "Unauthorized eccess, invalide request!")

    req.resetToken = resetToken
    next()
}