/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { expect } from 'chai';
import * as sinon from 'sinon';
import { QueryRunner } from '../../../src/editor/queryRunner';
import {
  getMockConnection,
  MockConnection,
  mockQueryText
} from '../testUtilities';
import {
  DiagnosticCollection,
  extensions,
  languages,
  Uri,
  window,
  workspace
} from 'vscode';
import * as path from 'path';

describe('Query Runner Should', () => {
  let mockConnection: MockConnection;
  let sandbox: sinon.SinonSandbox;
  let workspacePath: string;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    mockConnection = getMockConnection(sandbox);
    workspacePath = workspace.workspaceFolders![0].uri.fsPath;
    const ext = extensions.getExtension('salesforce.salesforcedx-vscode-soql')!;
    await ext.activate();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // it('returns query data without attribute properties', async () => {
  //   // @ts-ignore
  //   const queryRunner = new QueryRunner(mockConnection);
  //   const queryData = await queryRunner.runQuery(mockQueryText);
  //   queryData.records.forEach((result: {}) => {
  //     expect(result).to.not.have.key('attributes');
  //   });
  // });

  // it('throws error with conection.query() exception', async () => {
  //   const errorName = 'Bad Query';
  //   sandbox.stub(mockConnection, 'query').throws(errorName);
  //   // @ts-ignore
  //   const queryRunner = new QueryRunner(mockConnection);
  //   try {
  //     await queryRunner.runQuery(mockQueryText);
  //   } catch (error) {P
  //     expect(error.name).equal(errorName);
  //   }
  // });

  it('Should create diagnostics based off of limit 0 execute error results', async () => {
    const soqlFileUri = Uri.file(path.join(workspacePath, 'test.soql'));
    await window.showTextDocument(soqlFileUri);

    const diagnostics = languages.getDiagnostics(soqlFileUri);
    expect(diagnostics)
      .to.be.an('array')
      .to.have.lengthOf(1);

    // const resultItem = {
    //   filePath: 'test.soql',
    //   error: 'Invalid method referenced.',
    //   lineNumber: '1',
    //   columnNumber: '1',
    //   type: 'ApexClass',
    //   fullName: 'Testing'
    // };

    // deployErrorResult.result.push(resultItem);

    // handleDiagnosticErrors(
    //   deployErrorResult,
    //   workspacePath,
    //   sourcePath,
    //   errorCollection
    // );

    // const testDiagnostics = languages.getDiagnostics(
    //   Uri.file(path.join(workspacePath, resultItem.filePath))
    // );

    // expect(testDiagnostics)
    //   .to.be.an('array')
    //   .to.have.lengthOf(1);
    // expect(testDiagnostics[0].message).to.be.equals(resultItem.error);
    // expect(testDiagnostics[0].severity).to.be.equals(0); // vscode.DiagnosticSeverity.Error === 0
    // expect(testDiagnostics[0].source).to.be.equals(resultItem.type);
    // expect(testDiagnostics[0].range).to.be.an('object');

    // const testRange = getRange(resultItem.lineNumber, resultItem.columnNumber);
    // expect(testDiagnostics[0].range).to.deep.equal(testRange);
  });
});
