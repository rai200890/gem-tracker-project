angular.module('gemTrackerApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('branches/show.html',
    "<div>\n" +
    "    <div class=\"panel panel-info\">\n" +
    "        <div class=\"panel-heading\">Branches</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <div class=\"form-inline text-center\">\n" +
    "                <label>Current Branch</label>\n" +
    "                <select class=\"form-control\" ng-model=\"selectedBranch\" ng-options=\"branch as branch.name for branch in branches\">\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <ui-view>\n" +
    "        <div class=\"panel panel-info\">\n" +
    "            <div class=\"panel-heading\">Gemfile Versions</div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <h4 ng-show=\"!selectedBranch\" class=\"text-center\">Choose a branch for visualization</h4>\n" +
    "                <h4 ng-show=\"selectedBranch && gemfileVersions.length == 0\" class=\"text-center\">No changes in Gemfile.lock in this branch</h4>\n" +
    "                <table st-table=\"gemfileVersions\"  st-safe-src=\"gemfile_versions\" ng-show='selectedBranch && gemfileVersions.length > 0' class=\"table table-striped table-responsive\">\n" +
    "                    <thead>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"3\"><input st-search=\"\" class=\"form-control\" placeholder=\"Filter By Commit Id or Commit Message\" type=\"text\"/></th>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th>Commit Id</th>\n" +
    "                        <th st-sort=\"dtate\">Date</th>\n" +
    "                        <th>Commit Message</th>\n" +
    "                        <th st-sort=\"commit_author\">Author</th>\n" +
    "                    </tr>\n" +
    "                    <tbody ng-repeat=\"gemfileVersion in gemfileVersions\">\n" +
    "                    <tr>\n" +
    "                        <td>{{gemfileVersion.commit_id}}</td>\n" +
    "                        <td>{{gemfileVersion.date | date:'medium' }}</td>\n" +
    "                        <td>{{gemfileVersion.commit_message }}</td>\n" +
    "                        <td>{{gemfileVersion.commit_author }}</td>\n" +
    "                        <td><a ui-sref=\"projects_details.branches.gemfile_version({id: repository_id, branch_id: selectedBranch.id, gemfile_version_id: gemfileVersion.id})\"><i class=\"fa fa-search-plus\"></i></a></td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ui-view>\n" +
    "</div>"
  );


  $templateCache.put('diff/index.html',
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">New Diff</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-5 pull-left\">\n" +
    "                <label>Old</label>\n" +
    "                <div class=\"form-group\" >\n" +
    "                    <select class=\"form-control\" ng-model=\"oldBranch\"\n" +
    "                            ng-options=\"branch.id as branch.name for branch in branches\">\n" +
    "                        <option value=\"\" disabled selected>Select the branch</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div ng-show=\"oldBranch\" class=\"form-group form-inline\">\n" +
    "                    <select class=\"form-control\" ng-model=\"oldGemfileVersion\"\n" +
    "                            ng-options=\"gemfileVersion as (gemfileVersion.date | date: 'medium') for gemfileVersion in oldGemfileVersions\">\n" +
    "                        <option value=\"\" disabled selected>Select desired version from this branch</option>\n" +
    "                    </select>\n" +
    "                    <button ng-show=\"oldGemfileVersion\" popover-title=\"Commit Message\" popover=\"{{oldGemfileVersion.commit_message}}\" class=\"btn btn-sm btn-info\"><span class=\"fa fa-info-circle\"></span></button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-5 pull-right\">\n" +
    "                <label>New</label>\n" +
    "                <div class=\"form-group\" >\n" +
    "                    <select class=\"form-control\" ng-model=\"newBranch\"\n" +
    "                            ng-options=\"branch.id as branch.name for branch in branches\">\n" +
    "                        <option value=\"\" disabled selected>Select the branch</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div ng-show=\"newBranch\" class=\"form-group form-inline\">\n" +
    "                    <select  class=\"form-control\" ng-model=\"newGemfileVersion\"\n" +
    "                             ng-options=\"gemfileVersion as (gemfileVersion.date | date: 'medium') for gemfileVersion in newGemfileVersions\">\n" +
    "                        <option value=\"\" disabled selected>Select desired version from this branch</option>\n" +
    "                    </select>\n" +
    "                    <button ng-show=\"newGemfileVersion\" popover-title=\"Commit Message\" popover=\"{{newGemfileVersion.commit_message}}\" class=\"btn btn-sm btn-info\"><span class=\"fa fa-info-circle\"></span></button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">Diff</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div ng-if=\"diff\" class=\"container\">\n" +
    "            <div class=\"row\">\n" +
    "                <i class=\"fa fa-plus-circle\"></i><strong>Included</strong>\n" +
    "                <dl ng-if=\"diff.included.length\" class=\"dl-horizontal\" ng-repeat=\"item in diff.included\">\n" +
    "                    <dt>{{item.gem_name}}</dt>\n" +
    "                    <dd>{{item.version}}</dd>\n" +
    "                </dl>\n" +
    "                <p ng-if=\"!diff.included.length\">None</p>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <i class=\"fa fa-minus-circle\"></i><strong>Removed</strong>\n" +
    "                <dl ng-if=\"diff.removed.length\" class=\"dl-horizontal\" ng-repeat=\"item in diff.removed\">\n" +
    "                    <dt>{{item.gem_name}}</dt>\n" +
    "                    <dd>{{item.version}}</dd>\n" +
    "                </dl>\n" +
    "                <p ng-if=\"!diff.removed.length\">None</p>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <i class=\"fa fa-refresh\"></i><strong>Updated</strong>\n" +
    "                <dl ng-if=\"diff.updated.length\" class=\"dl-horizontal\" ng-repeat=\"item in diff.updated\">\n" +
    "                    <dt>{{item.gem_name}}</dt>\n" +
    "                    <dd>{{item.version}}</dd>\n" +
    "                </dl>\n" +
    "                <p ng-if=\"!diff.updated.length\">None</p>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <i class=\"fa fa-square\"></i><strong>Unchanged</strong>\n" +
    "                <dl ng-if=\"diff.unchanged.length\" class=\"dl-horizontal\" ng-repeat=\"item in diff.unchanged\">\n" +
    "                    <dt>{{item.gem_name}}</dt>\n" +
    "                    <dd>{{item.version}}</dd>\n" +
    "                </dl>\n" +
    "                <p ng-if=\"!diff.unchanged.length\">None</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!diff\" class=\"text-center container\">\n" +
    "        <h4>Choose 2 gemfile versions for comparison</h4>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('gemfile_versions/show.html',
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">Gemfile</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <dl class=\"dl-horizontal\">\n" +
    "            <dt>Branch</dt>\n" +
    "            <dd>{{gemfileVersion.branch_name}}</dd>\n" +
    "            <dt>Commit Id</dt>\n" +
    "            <dd>{{gemfileVersion.commit_id}}</dd>\n" +
    "            <dt>Commit Message</dt>\n" +
    "            <dd>{{gemfileVersion.commit_message}}</dd>\n" +
    "            <dt>Author</dt>\n" +
    "            <dd>{{gemfileVersion.commit_author}}</dd>\n" +
    "            <dt>Date</dt>\n" +
    "            <dd>{{gemfileVersion.date | date: 'medium'}}</dd>\n" +
    "            <a class=\"btn btn-primary\" ui-sref=\"projects_details.branches({id: repository_id, branch_id: branch_id})\"><i class=\"fa fa-mail-reply\"></i></a>\n" +
    "        </dl>\n" +
    "        <table st-table=\"gemVersions\"  st-safe-src=\"gem_versions\" class=\"table table-striped table-responsive\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th colspan=\"3\"><input st-search=\"\" class=\"form-control\" placeholder=\"Filter By Name\" type=\"text\"/></th>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <th st-sort=\"name\">Name</th>\n" +
    "                <th>Version</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody ng-repeat=\"gemVersion in gemVersions\">\n" +
    "            <tr>\n" +
    "                <td>{{gemVersion.gem_name}}</td>\n" +
    "                <td>{{gemVersion.version}}</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('index.html',
    "<div>\n" +
    "    <h1></h1>\n" +
    "</div>\n"
  );


  $templateCache.put('messages/alert.html',
    "<div class=\"col-md-12\" ng-controller=\"MessagesController\">\n" +
    "    <div ng-include=\" 'messages/success.html' \"></div>\n" +
    "    <div ng-include=\" 'messages/errors.html' \"></div>\n" +
    "</div>"
  );


  $templateCache.put('messages/errors.html',
    "<alert ng-if=\"message.error\" type=\"danger\" close=\"closeErrorMessages()\">\n" +
    "    <div ng-if=\"message.error\">\n" +
    "        <strong>Error!</strong> {{message.error}}\n" +
    "    </div>\n" +
    "</alert>\n" +
    "<alert ng-if=\"message.errors\" type=\"danger\" close=\"closeErrorMessages()\">\n" +
    "    <strong>Errors!</strong>\n" +
    "    <div ng-repeat=\"(field, errors) in message.errors\">\n" +
    "        <strong>{{field}}</strong> {{errors}}\n" +
    "    </div>\n" +
    "</alert>"
  );


  $templateCache.put('messages/success.html',
    "<alert ng-if=\"message.success\" type=\"success\" close=\"closeSuccessMessage()\">\n" +
    "    <strong>Success! </strong> {{message.success}}\n" +
    "</alert>"
  );


  $templateCache.put('modals/confirmation.html',
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <span class=\"fa fa-times close\" ng-click=\"cancel()\"></span>\n" +
    "        <h4 class=\"modal-title\">Confirmação</h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <h4>{{message}}</h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn\" ng-click=\"cancel()\">Não</button>\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"ok()\">Sim</button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('projects/index.html',
    "<div class=\"row\" ng-controller=\"ProjectsController\">\n" +
    "    <div ng-include=\" 'messages/alert.html' \"></div>\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div ui-view=\"new\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div ui-view=\"list\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('projects/info.html',
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">Project Information</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <dl class=\"dl-horizontal\">\n" +
    "            <dt>Name</dt>\n" +
    "            <dd>{{repository.name}}</dd>\n" +
    "            <dt>URL</dt>\n" +
    "            <dd><a ng-href=\"{{repository.url}}\" target=\"_blank\">{{repository.url}}</a></dd>\n" +
    "        </dl>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('projects/list.html',
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">Projects</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <table ng-show=\"repositories.length > 0\" st-table=\"repositories\"  st-safe-src=\"repos\" class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th colspan=\"4\"><input st-search=\"\" class=\"form-control\" placeholder=\"filter project by name or url\" type=\"text\"/></th>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <th st-sort=\"name\">Name</th>\n" +
    "                <th st-sort=\"url\">URL</th>\n" +
    "                <th></th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"repository in repositories\">\n" +
    "                <td>{{repository.name}}</td>\n" +
    "                <td><a ng-href=\"{{repository.url}}\" target=\"_blank\">{{repository.url}}</a></td>\n" +
    "                <td><a ui-sref=\"projects_details.info({id: repository.id})\"><i class=\"fa fa-search-plus\"></i></a></td>\n" +
    "                <td><a href ng-click=\"update(repository)\"><i class=\"fa fa-refresh {{ (repository.loading)? 'fa-circle-o-notch fa-spin' : ''}}\"></i></a></td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "            <tfoot>\n" +
    "            <tr>\n" +
    "                <td colspan=\"4\" class=\"text-center\">\n" +
    "                    <div st-pagination=\"\" st-items-by-page=\"5\" st-displayed-pages=\"5\"></div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tfoot>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"text-center\" ng-show=\"repositories.length ==0\">\n" +
    "        <h4>No projects yet</h4>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('projects/new.html',
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">New Project</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div ng-show=\"loading\" class=\"text-center\" >\n" +
    "           <h4>Loading Project <i class=\"fa fa-refresh fa-spin\" ></i></h4>\n" +
    "        </div>\n" +
    "        <div ng-show=\"!loading\" >\n" +
    "            <form class=\"form-inline\" role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Project Name\" ng-model=\"project.name\" required/>\n" +
    "                    <input type=\"text\" class=\"form-control large\" name=\"url\" placeholder=\"Project URL\" ng-model=\"project.url\" required/>\n" +
    "                </div>\n" +
    "                <button class=\"btn btn-small btn-primary\" ng-click=\"create()\" ng-disabled=\"!project.name || !project.url\"><span class=\"fa fa-upload\"></span></button>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('projects/show.html',
    "<ul class=\"nav nav-pills\">\n" +
    "    <li class=\"{{(selectedState == state) ? 'active' : ''}}\" ng-repeat=\"state in states\"><a ui-sref=\"{{state.name}}\">{{state.description}}</a></li>\n" +
    "</ul>\n" +
    "<div>\n" +
    "    <ui-view>\n" +
    "        <div ui-view=\"projects_details.info\"></div>\n" +
    "    </ui-view>\n" +
    "</div>\n"
  );

}]);
