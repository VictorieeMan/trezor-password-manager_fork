'use strict';

class Store {

    constructor(data, eventEmitter) {
        this.data = data;
        this.eventEmitter = eventEmitter;
        this.eventEmitter.emit('update', this.data);
    }

    ///////////
    //
    // TAGS
    //
    //////////

    getTagTitleById(tagId) {
        tagId = tagId ? tagId : 0;
        console.log(this.data.tags);
        return Object.getOwnPropertyDescriptor(this.data.tags, tagId).value.title
    }

    getTagIdByTitle(title) {
        var resultId;
        Object.keys(this.data.tags).map((key) => {
            if (this.data.tags[key].title === title) resultId = key;
        });
        return resultId;
    }

    getTagIconById(tagId) {
        console.log(tagId);
        tagId = tagId ? tagId : 0;
        console.log(tagId);
        return Object.getOwnPropertyDescriptor(this.data.tags, tagId).value.icon
    }

    getTagTitleArrayById(tag_array) {
        return Object.keys(tag_array).map((key) => {
            return this.data.tags[tag_array[key]].title
        });
    }

    getTagTitleArray() {
        return Object.keys(this.data.tags).map((key) => {
            return this.data.tags[key].title
        });
    }

    getTagIdArray() {
        return Object.keys(this.data.tags).map((key) => {
            return parseInt(key)
        });
    }

    changeTagTitleById(tagId, newTagTitle) {
        var tagData = Object.getOwnPropertyDescriptor(this.data.tags, tagId).value,
            oldTagTitleArray = this.getTagTitleArray();
        if (oldTagTitleArray.indexOf(newTagTitle) == -1) {
            tagData.title = newTagTitle;
            this.saveDataToTagById(tagId, tagData);
            this.eventEmitter.emit('update', this.data);
            return true;
        } else {
            return false;
        }

    }

    changeTagIconById(tagId, newTagIcon) {
        var tagData = Object.getOwnPropertyDescriptor(this.data.tags, tagId).value;
        tagData.icon = newTagIcon;
        this.saveDataToTagById(tagId, tagData);
        this.eventEmitter.emit('update', this.data);
    }

    saveDataToTagById(tagId, data) {
        return Object.defineProperty(this.data.tags, tagId, {value: data});

    }

    addNewTag(newTitle, newIcon) {
        var data = {
                "title": newTitle,
                "icon": newIcon
            },
            newId = Object.keys(this.data.tags).length + 1,
            oldTagTitleArray = this.getTagTitleArray();
        if (oldTagTitleArray.indexOf(newTitle) == -1) {
            this.data.tags[newId] = data;
            this.eventEmitter.emit('update', this.data);
            return true;
        } else {
            return false;
        }
    }

    ///////////
    //
    // ENTRIES
    //
    //////////

    getEntryTitleById(entryId) {
        return Object.getOwnPropertyDescriptor(this.data.entries, entryId).value.title
    }

    saveDataToEntryById(entryId, data) {
        return Object.defineProperty(this.data.entries, entryId, {value: data});
    }

    addTagToEntry(tagId, entryId) {
        var entryData = Object.getOwnPropertyDescriptor(this.data.entries, entryId).value;
        entryData.tags.push(parseInt(tagId));
        this.saveDataToEntryById(entryId, entryData);
    }

    removeTagFromEntry(tagId, entryId) {
        var entryData = Object.getOwnPropertyDescriptor(this.data.entries, entryId).value;
        var index = entryData.tags.indexOf(parseInt(tagId));
        entryData.tags.splice(index, 1);
        this.saveDataToEntryById(entryId, entryData);
    }

    getPossibleToAddTagsForEntry(entryId) {
        var entryData = Object.getOwnPropertyDescriptor(this.data.entries, entryId).value,
            allTags = this.getTagIdArray(),
            resultTagArray = [];
        allTags.splice(0, 1);
        allTags.map((key) => {
            if (entryData.tags.indexOf(key) === -1) {
                resultTagArray.push(this.getTagTitleById(key));
            }
        });
        return resultTagArray;
    }

    toObject() {
        return this.data;
    }
}

module.exports = Store;