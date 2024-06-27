#!/usr/bin/env.white
import chalk from "chalk";
import inquirer from "inquirer";
//for while use loop again and again
while (true) {
    console.log(chalk.bold.underline.bgGreenBright(`\n\tWelcome TO Student Management System\n\t`));
    //for student unique ID number
    const randoNumber = Math.floor(10000 + Math.random() * 90000);
    //student balance
    let myBlance = 0;
    let answer = await inquirer.prompt([
        {
            name: "student",
            type: "input",
            message: chalk.red("Enter Student Name?"),
            //validate is use for when the user press enter or no type then use valodate function
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return chalk.underline.red("Please Enter A non Empty Value");
            },
        },
    ]);
    console.log(chalk.blue(`\n\tYOUR NAME IS : ${chalk.green(answer.student)}\n\tYOUR ID IS ${chalk.green(randoNumber)}\n\t`));
    let program = await inquirer.prompt([
        {
            name: "coursess",
            type: "list",
            message: "Select The Course To Enrolled",
            choices: ["GOV WEB 3.0", "BITCOIN", "BLOCK CHAIN"],
        },
    ]);
    // for use the key is string but we need number to claculate process
    const Fee = {
        "GOV WEB 3.0": 10000,
        BITCOIN: 8000,
        "BLOCK CHAIN": 7000,
    };
    console.log(chalk.yellow(`\n TutionFees: ${chalk.red(Fee[program.coursess])}/-\n`));
    console.log(chalk.underline.red(`\nYOUR COURSE FEE IS UNPAID\n\nYOUR CURRENT BALNCE IS: ${chalk.gray(myBlance)}\n`));
    //payment  method
    let paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: chalk.red("Select Your Payment Method TO PAID COURSE FEE!\n"),
            choices: ["BANK", "EASYPAISA", "JAZZCASH"],
        },
        {
            name: "amount",
            type: "input",
            message: chalk.red(`Transfer Money(NOTE ENTER ONLY GIVEN AMOUNT COUSRE FEE!${chalk.yellow(program.coursess)}):`),
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return chalk.red("Please Enter A correct Value");
            },
        },
    ]);
    console.log(chalk.yellow(`\n You Select Payment Method Through ${chalk.underline.bold(paymentType.payment)}\n`));
    const TutionFees = Fee[program.coursess];
    const paymentAmounts = parseFloat(paymentType.amount);
    if (TutionFees === paymentAmounts) {
        console.log(chalk.bgGreenBright(`\nCongrats You Have Sucessfull Enrolled in ${chalk.underline.bold.bgGray(program.coursess)}\n\t YOUR COURSE FEE IS PAID.\n\t`));
        let ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: chalk.red("Do You Want To See Status?"),
                choices: ["View Status", "Back"],
            },
        ]);
        if (ans.select === "View Status") {
            console.log(chalk.underline.bgBlackBright(`\n\t-----STATUS----\n\t`));
            console.log(chalk.white(`Student name : ${chalk.blue(answer.student)}`));
            console.log(chalk.white(`Student ID : ${chalk.blue(randoNumber)}`));
            console.log(chalk.white(`Course : ${chalk.blue(program.coursess)}`));
            console.log(chalk.white(`Tution Fee Paid : ${chalk.blue(paymentAmounts)}`));
            console.log(chalk.white(`Balance : ${chalk.blue((myBlance += paymentAmounts))}\n`));
        }
        else if (ans.select === "Back") {
            console.log(`\n\t`);
        }
    }
    else {
        console.log(chalk.underline.bold.bgRed(`Invalid Amount Due To Course.\n`));
    }
    let Exiting = await inquirer.prompt([
        {
            name: "close",
            type: "list",
            message: chalk.red("Do You Want To Continue or ExIT?\n"),
            choices: ["CONTINUE", "EXIT"],
        },
    ]);
    if (Exiting.close === "CONTINUE") {
        console.log(`\n`);
    }
    else {
        console.log(chalk.bold.underline.bgGreen(`\n\t Exiting Student Management System \n\t\n\t\t\tGood Bye.\n\t`));
        break; //break use for end loop
    }
}
