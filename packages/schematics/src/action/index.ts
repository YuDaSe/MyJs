import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  chain,
  SchematicsException,
  mergeWith,
} from '@angular-devkit/schematics';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import * as stringUtils from '@schematics/angular/strings';
import { SchematicDemoAction as ActionOptions } from './schema';

export default function (options: ActionOptions): Rule {
  const sourceDir = options.sourceDir;
  if (!sourceDir) {
    throw new SchematicsException(`sourceDir option is required.`);
  }

  return (host: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ...options
      }),
      move(sourceDir),
    ]);

    return chain([
      mergeWith(templateSource),
    ])(host, context);
  };
}
