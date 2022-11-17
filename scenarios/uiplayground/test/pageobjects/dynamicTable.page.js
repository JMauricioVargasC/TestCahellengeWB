const Page = require('./page');

class DynamicTable extends Page {

    get tableAria() {
        return $('//div[@aria-label="Tasks"]');
    }

    get rowsTable() {
        return $$('//div[@role="row"]');
    }

    get nameHeaderFirtsRow() {
        return ('//div/div/span[@role="columnheader"]');
    }
    get columnTable() {
        return $$('//div/div[@role="row"]');
    }

    get nameFirtscolumn() {

        return ('//*[@role="rowgroup"][2]/div[" "]/span[1]');
    }

    get warningBar() {
        return ('//p[@class="bg-warning"]');
    }

    async validateFirtsRow() {
        var arrayNamesRows = ["Name", "Network", "CPU", "Disk", "Memory"]//business rule
        const rows = await this.rowsTable;//business rule
        const columns = await rows[1].$$(this.nameHeaderFirtsRow);
        const lengthColumn = await columns.length;
        const lengthExpected = arrayNamesRows.length;
        await expect(lengthColumn).toEqual(lengthExpected);
        for (let i = 0; i < arrayNamesRows.length; i++) {
            let nameColumns = await columns[i].getText();
            let compareNames = arrayNamesRows.find(element => element == nameColumns);
            expect(compareNames).toBeDefined();
        }
    }

    async validateColumns() {
        var arrayNamesColumns = ["Internet Explorer", "System", "Chrome", "Firefox"]//business rule
        const lengthColumn = 4;//business rule
        const lengthExpected = arrayNamesColumns.length;
        expect(lengthColumn).toEqual(lengthExpected);
        for (var f = 1; f < lengthExpected + 1; f++) {
            let name = ('//*[@role="rowgroup"][2]/div[' + f + ']/span[1]'); this.getgrop + f + this.getgroup2;
            let column = await $(name).getText();
            let compareNames = arrayNamesColumns.find(element => element == column);
            expect(compareNames).toBeDefined();
        }
    }

    async validateColorWarBar() {
        const colorBusiness = "rgba(33,37,41,1)";//business rule
        const elem = await $(this.warningBar);
        const color = await elem.getCSSProperty('color');
        var jsonColor = JSON.stringify(color);
        var parsed = JSON.parse(jsonColor);
        expect(color).toBeExisting;
        expect(parsed.value).toEqual(colorBusiness)
    }

    async validateDataTableColumns(ColumnB) {
        const columnBusiness = ColumnB;//business rule
        const rows = await this.rowsTable;
        const lengthrowsExpected = rows.length;
        const columns = await rows[1].$$(this.nameHeaderFirtsRow);
        const lengthColumnsExpected = columns.length;
        for (let i = 1; i < lengthColumnsExpected - 1; i++) {
            let nameColumns = await columns[i].getText();
            if (nameColumns == columnBusiness) {
                i++;
                for (var f = 1; f <= lengthrowsExpected - 1; f++) {
                    let name = ('//*[@role="rowgroup"][2]/div[' + f + ']/span[' + i + ']');
                    let column = await $(name).getText();
                    expect(column).toBePresent();
                    expect(column).toBeDefined();
                    if (columnBusiness == 'CPU') {
                        expect(column).toContain('%');
                    }
                    if (columnBusiness == 'Memory') {
                        expect(column).toContain('MB');
                    }
                    if (columnBusiness == 'Network') {
                        expect(column).toContain('Mbps');
                    }
                    if (columnBusiness == 'Disk') {
                        expect(column).toContain('MB/s');
                    }
                }
            }
        }
    }

    open() {
        return super.open('dynamictable');
    }
}

module.exports = new DynamicTable();
