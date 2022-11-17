const Page = require('./page');

class Overlapped extends Page {

    get placeId() {
        return $('#id');
    }

    open() {
        return super.open('overlapped');
    }
    async scrollId() {
        expect(await this.placeId.scrollIntoView()).toBeDisplayed();
    }

}

module.exports = new Overlapped();