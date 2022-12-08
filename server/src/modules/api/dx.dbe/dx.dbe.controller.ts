import {Controller, Get, Post} from '@nestjs/common';
import {metadata, tableData, splitScreenSettings, foreignKeyInfo} from "./../../../mockedData";

@Controller('api/dxDbe')
export class DxDbeController {

    @Get()
    getId() {
        return 1;
    }

    @Post('/getDbeTableMetaData')
    getDbeTableMetaData() {
        return metadata;
    }
    @Post('/getTableData')
    getTableData() {
        return tableData;
    }
    @Get('/getSplitScreenSettings')
    getSplitScreenSettings() {
        return splitScreenSettings;
    }
    @Get('/getForeignKeyInfo')
    getForeignKeyInfo() {
        return foreignKeyInfo;
    }
    @Post('/validateValueByCustomValidator')
    validateValueByCustomValidator() {
        return true;
    }
}
