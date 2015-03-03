describe('Project creation', function() {
    describe('Valid data',function() {
        beforeEach(function() {
            proxy.onLoad.whenGET("api/projects.json").respond(200, []);
            proxy.onLoad.whenPOST("api/projects.json").respond(200,
                {});
        });
        it('A project should be successfully created', function() {
            browser.get("/projects");
            element(by.model('newTipoDiplomaLegal.descricao')).sendKeys('Decreto');
            element(by.model('newTipoDiplomaLegal.sigla')).sendKeys('DRC');
            element(by.id('new')).click();
            expect(element(by.css('.alert-success')).getText()).toMatch(/Sucess/);
        });
    });
    describe('Invalid data',function() {
        beforeEach(function() {
        });

        it('Deve retornar mensagem de erro', function() {
        });
    });
});