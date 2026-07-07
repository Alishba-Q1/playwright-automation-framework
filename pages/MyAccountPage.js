
import { expect } from '@playwright/test';

export class MyAccountPage {
    constructor(page){
        this.page = page;
        this.accountHeading = page.locator('[data-test="page-title"]');
    
    }   

    async verifyPageLoaded(){
        await expect(this.accountHeading).toHaveText('My account');
    }


}