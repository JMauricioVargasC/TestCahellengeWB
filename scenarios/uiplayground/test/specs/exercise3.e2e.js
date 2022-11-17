const dynamicTable = require('../pageobjects/dynamicTable.page')
const overlapped = require('../pageobjects/overlapped.page')

describe('Dynamic table validate ', () => {
    beforeEach(function () {
        dynamicTable.open();
    })

    it('test 1: table exist ', async () => {
        await expect(dynamicTable.tableAria).toBeExisting();
    });

    it('test 2: Firts row elements validate ', async () => {
        await expect(dynamicTable.rowsTable).toBeExisting();
        await dynamicTable.validateFirtsRow();
    });

    it('test 3: Firts columns elements validate ', async () => {
        await dynamicTable.validateColumns();
    });
    it('test 4: Validate de color of Warning bar ', async () => {
        await dynamicTable.validateColorWarBar();
    });
    it('test 5: Validate values change upon refresh ', async () => {
        await browser.refresh();
        await expect(dynamicTable.tableAria).toBeExisting();
        await expect(dynamicTable.rowsTable).toBeExisting();
        await dynamicTable.validateFirtsRow();
        await dynamicTable.validateColumns();
        await dynamicTable.validateColorWarBar();
    });

    it('test 6: Validate values from CPU column ', async () => {
        await dynamicTable.validateDataTableColumns('CPU');
    });
    it('test 7: Validate values from Memory column ', async () => {
        await dynamicTable.validateDataTableColumns('Memory');
    });
    it('test 8: Validate values from Network column ', async () => {
        await dynamicTable.validateDataTableColumns('Network');
    });

    it('test 9: Validate values from Disk column ', async () => {
        await dynamicTable.validateDataTableColumns('Disk');
    });
});

describe('Overlapped validate ID ', () => {
    beforeEach(function () {
        overlapped.open();
    })
    it('test 1: ID element should be displayed in viewport when user scrolls down ', async () => {
        await overlapped.scrollId();
    });

})
