/*

npx sequelize-cli model:generate --name Symptom --attributes name:string
npx sequelize-cli model:generate --name User_Detail --attributes noAsuransi:string
npx sequelize-cli model:generate --name Medical_Record --attributes history:string,date:date
npx sequelize-cli model:generate --name Test_Lab --attributes pictureScan:string,result:string,UserId:integer
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string,Medical_RecordId:integer
npx sequelize-cli model:generate --name Disease --attributes name:string,description:text,level:integer,SymptompId:integer,UserId:integer
*/