const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const forumSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {timestamps: true});
forumSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const forum = mongoose.model('forum', forumSchema);
module.exports = forum;
