const{ OpenAIClient,AzureKeyCredential} = require('@azure/openai');
const readline=require('readline');
require('dotenv/config');

const client = new OpenAIClient(
    process.env.GPT_ENDPOINT,
     new AzureKeyCredential (process.env.GPT_KEY),
);
const getmessage=async(message) => {
try{
    const response = await client.getCompletions(
        process.env.GPT_MODEL,
        message,
        {
            remperature:0.7,
            maxTokens:50,
        }
    );
    return response.choices[0].text.trim();
} catch(error){
    console.log(error);
}
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
 }
 (async () =>{
    console.log('bem vindo ao MELHOR CHAT EVER');
    console.log('Se precisar so digitar "sair" para sair');

    while(true){
        const message = await askQuestion('Você: ');
        if(message === 'sair'){
            console.log('Muito Obrigado <3, Volte sempre.');
            break;
        }
        const response = await getmessage(message);
        console.log('CHAT: ' + response);
    }
    rl.close();

 })();




    