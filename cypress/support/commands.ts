/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import type { UserType } from '../../src/libs/types/auth/user';
import createAccountAs from './utils/auth/create-account-as';
import login from './utils/auth/login';
import readAndFillOtp from './utils/auth/readAndFillOtp';
import selectUserType from './utils/auth/select-user-type';
import clickButtonInRowWithStatus from './utils/clickButtonInRowWithStatus';
import clickLinkInRowWithStatus from './utils/clickLinkInRowWithStatus';
import expectModal from './utils/expectModal';
import expectModalAction from './utils/expectModalAction';
import fillOtp from './utils/fill-otp';
import getFundCard from './utils/getFundCard';
import getNumberOfRows from './utils/getTotalNumberOfResults';
import loginAndVisit from './utils/loginAndVisit';
import selectDateFromPicker from './utils/select-date';
import selectDropdownOption from './utils/select-dropdown-option';
import selectRadioOption from './utils/select-radio-option';
import {
  getColumnIndexByText,
  testFilterDate,
  testFilterSort,
} from './utils/test-filters';
import uploadFile from './utils/upload-file';
import verifyMiddlewareRedirection from './utils/verifyMiddlewareRedirection';
import visitAdmin from './utils/visitAdmin';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create an account based on user type.
       * @example cy.selectUserType('individual investor')
       */
      createAccountAs(type: UserType): Chainable<void>;

      /**
       * Custom command to select a user type.
       * @example cy.selectUserType('individual investor')
       */
      selectUserType(type: UserType): Chainable<void>;

      /**
       * Custom command to fill otp.
       * @example cy.fillOtp('1234')
       */
      fillOtp(opt: string): Chainable<void>;

      /**
       * Custom command to login.
       * @example cy.login('user@test.com', 'password')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to click link in row with status.
       * @example cy.clickLinkInRowWithStatus('individual investor')
       */
      clickLinkInRowWithStatus(
        status: string,
        statusColumnNumber: number,
      ): Chainable<Element>;

      /**
       * Custom command to click the button in the last cell of the first row with the passed status.
       * @example cy.clickLinkInRowWithStatus('Pending', 6)
       */
      clickButtonInRowWithStatus(
        status: string,
        statusColumnNumber: number,
      ): Chainable<Element>;

      /**
       * Custom command to select dropdown option.
       * @example cy.selectDropdownOption('Select Status', 'Approved')
       */
      selectDropdownOption(
        dataCyId: string,
        option?: string,
      ): Chainable<Element>;

      /**
       * Custom command to select dropdown option.
       * @example cy.selectDropdownOption('worked-in-financial-sector', /yes/i);
       */
      selectRadioOption(
        dataCY: string,
        labelText?: string | RegExp,
      ): Chainable<Element>;

      /**
       * Custom command to get number .
       * @example cy.getNumberOfRows().then((total) => {console.log(total)})
       */
      getNumberOfRows(): Cypress.Chainable<number>;

      /**
       * Custom command to select date from picker.
       * @example cy.selectDateFromPicker('2021-09-01');
       */
      selectDateFromPicker(cyId: string, date: Date): Chainable<Element>;

      /**
       * Custom command to upload file.
       * @example cy.uploadFile('avatar', 'test.jpeg', 'image/jpeg', true);
       */
      uploadFile(
        elementId: string,
        fileName: string,
        fileType: string,
        useWrapper?: boolean,
      ): Chainable<Element>;

      /**
       * Custom command to read and fill otp.
       * @example cy.readAndFillOtp(() => cy.get('button:contains("Log In")').click());
       */
      readAndFillOtp(action: () => void): Chainable<Element>;

      /**
       * Custom command to get fund card.
       * @example cy.getFundCard('fundApproved', 'View details');
       */
      getFundCard(
        status: string | string[],
        buttonText: string,
      ): Chainable<Element>;

      /**
       * Custom command to login and visit admin route.
       * @example cy.visit('/admin/funds');
       */
      visitAdmin(url: string): Chainable<Element>;

      /**
       * Custom command to login as a specific user and visit a route.
       * @example cy.loginAndVisit('/fund-manager/support');
       */
      loginAndVisit(
        userType:
          | 'fundManager'
          | 'individualInvestor'
          | 'corporateInvestor'
          | 'admin',
        path: string,
      ): Chainable<Element>;

      /**
       * Custom command that expects a modal to popup with specific text and closes it.
       * @example cy.expectModal('Message sent successfully');
       */
      expectModal(modalText: string | number | RegExp): void;

      /**
       * command that expects a modal to popup with specific text an optional action to be executed after the modal is found.
       * @param bodyText the text or regex to be found in the modal body
       * @param action an optional function to be executed after the modal is found
       * @example cy.expectModalAction('Message sent successfully', () => cy.get('button:contains("Close")').click());
       */
      expectModalAction(
        bodyText: string | number | RegExp,
        action?: () => void,
      ): void;

      /**
       * Custom command that verifies if a middleware that redirects user out of a specific page.
       * @example cy.expectModal('Message sent successfully');
       */
      verifyMiddlewareRedirection(
        visitUrl: string,
        expectedUrl: string,
      ): Chainable<Element>;
      clickOnTableFirstRow(): Chainable<Element>;

      /**
       * Custom command to test sort.
       * @param filter  The filter to be tested
       * @param sort  The sort order to be tested
       * @example cy.testFilterSort('Email', 'desc');
       */
      testFilterSort(filter: string, sort?: 'asc' | 'desc'): Chainable<Element>;

      /**
       * Custom command to test filter date.
       * @param startDate the start date to be tested
       * @param endDate the end date to be tested
       * @example testFilterDate('October 7, 2023', 'April 30, 2027');
       */
      testFilterDate(startDate: string, endDate: string): Chainable<Element>;

      /**
       * Custom command to get the index of a column by its header text
       * @param headerText The text of the header to be found
       */
      getColumnIndexByText(headerText: string): Chainable<number>;
    }
  }
}

Cypress.Commands.add('selectUserType', selectUserType);
Cypress.Commands.add('fillOtp', fillOtp);
Cypress.Commands.add('createAccountAs', createAccountAs);
Cypress.Commands.add('login', login);
Cypress.Commands.add('readAndFillOtp', readAndFillOtp);
Cypress.Commands.add('clickLinkInRowWithStatus', clickLinkInRowWithStatus);
Cypress.Commands.add('clickButtonInRowWithStatus', clickButtonInRowWithStatus);
Cypress.Commands.add('selectDropdownOption', selectDropdownOption);
Cypress.Commands.add('selectRadioOption', selectRadioOption);
Cypress.Commands.add('getNumberOfRows', getNumberOfRows);
Cypress.Commands.add('selectDateFromPicker', selectDateFromPicker);
Cypress.Commands.add('uploadFile', uploadFile);
Cypress.Commands.add('getFundCard', getFundCard);
Cypress.Commands.add('visitAdmin', visitAdmin);
Cypress.Commands.add('loginAndVisit', loginAndVisit);
Cypress.Commands.add('expectModal', expectModal);
Cypress.Commands.add('expectModalAction', expectModalAction);
Cypress.Commands.add(
  'verifyMiddlewareRedirection',
  verifyMiddlewareRedirection,
);
Cypress.Commands.add('testFilterSort', testFilterSort);
Cypress.Commands.add('testFilterDate', testFilterDate);
Cypress.Commands.add('getColumnIndexByText', getColumnIndexByText);

export {}; // This is needed to make this module an ES6 module for the declare global to work.
