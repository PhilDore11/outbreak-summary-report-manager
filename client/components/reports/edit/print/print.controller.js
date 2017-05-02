'use strict';

angular.module('app.reports.edit.print', [])

  .config(function($stateProvider) {
    $stateProvider.state('reports.edit.print', {
      url: '/print',
      templateUrl: 'components/reports/edit/print/printPreview.tpl.html',
      controller: 'ReportPrintController',
      resolve: {
        report: function($stateParams, ReportsService) {
          return ReportsService.getReport($stateParams.reportId);
        }
      },
      data: {
        title: {
          label: 'Print Report',
          showReportName: true
        },
        actions: [{
          icon: 'list',
          state: 'reports.list',
          label: 'Back to List'
        }, {
          icon: 'edit',
          state: 'reports.edit.outbreakInfo',
          label: 'Report Information'
        }, {
          icon: 'border_all',
          state: 'reports.edit.dataEntry',
          label: 'Data Entry'
        }, {
          icon: 'show_chart',
          state: 'reports.edit.epiCurve',
          label: 'Epi Curve'
        }]
      }
    });

    $stateProvider.state('reports.edit.print.preview', {
      url: '/preview',
      views: {
        facilityInfo: {
          templateUrl: 'components/reports/form/facilityInfo.tpl.html',
          controller: 'ReportPrintInfoController'
        },
        infectionInfo: {
          templateUrl: 'components/reports/form/infectionInfo.tpl.html',
          controller: 'ReportPrintInfoController'
        },
        epiCurve: {
          templateUrl: 'components/reports/edit/epiCurve/epiCurve.tpl.html',
          controller: 'ReportEditEpiCurveController',
        }
      }
    });
  })

  .controller('ReportPrintController', function($scope, $state, report) {
    $scope.report = report;

    $scope.printReport = function() {
      pdfMake.createPdf({
        header: 'Outbreak Summary Report',
        content: [
          report.name
        ]}
      ).download();
    };
  })

  .controller('ReportPrintInfoController', function($scope) {
    $scope.readonly = true;
  });