//  Home page ...> loadded , has login > redirects to login > loin has heading > login has email and password fields > login has submit button > login has forgot password link > login has create account link > login has social login buttons

 export class  HomePage {
    constructor(page){
        this .page = page;
        this.signInButton = page.locator( '[data-test = "nav-sign-in"]');
    }

    async open(){
        await this.page.goto('https://practicesoftwaretesting.com/')

    }
    async navigateToLogin(){
    await this.signInButton.click();
    
}

}