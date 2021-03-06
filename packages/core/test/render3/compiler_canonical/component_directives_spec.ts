/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, HostBinding, HostListener, Injectable, Input, NgModule, OnDestroy, Optional, Pipe, PipeTransform, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren, ViewContainerRef} from '../../../src/core';
import * as $r3$ from '../../../src/core_render3_private_export';
import {renderComponent, toHtml} from '../render_util';

/// See: `normative.md`
describe('components & directives', () => {
  type $boolean$ = boolean;
  type $any$ = any;
  type $number$ = number;


  it('should instantiate directives', () => {
    type $ChildComponent$ = ChildComponent;
    type $MyComponent$ = MyComponent;

    const log: string[] = [];
    @Component({selector: 'child', template: 'child-view'})
    class ChildComponent {
      constructor() { log.push('ChildComponent'); }
      // NORMATIVE
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: ChildComponent,
        tag: `child`,
        factory: () => new ChildComponent(),
        template: function(ctx: $ChildComponent$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵT(0, 'child-view');
          }
        }
      });
      // /NORMATIVE
    }

    @Directive({
      selector: '[some-directive]',
    })
    class SomeDirective {
      constructor() { log.push('SomeDirective'); }
      // NORMATIVE
      static ngDirectiveDef = $r3$.ɵdefineDirective({
        type: SomeDirective,
        factory: () => new SomeDirective(),
      });
      // /NORMATIVE
    }

    // Important: keep arrays outside of function to not create new instances.
    // NORMATIVE
    const $e0_attrs$ = ['some-directive', ''];
    const $e0_dirs$ = [SomeDirective];
    // /NORMATIVE

    @Component({selector: 'my-component', template: `<child some-directive></child>!`})
    class MyComponent {
      // NORMATIVE
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyComponent,
        tag: 'my-component',
        factory: () => new MyComponent(),
        template: function(ctx: $MyComponent$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, ChildComponent, $e0_attrs$, $e0_dirs$);
            $r3$.ɵe();
            $r3$.ɵT(3, '!');
          }
          ChildComponent.ngComponentDef.h(1, 0);
          SomeDirective.ngDirectiveDef.h(2, 0);
          $r3$.ɵr(1, 0);
          $r3$.ɵr(2, 0);
        }
      });
      // /NORMATIVE
    }

    expect(renderComp(MyComponent)).toEqual('<child some-directive="">child-view</child>!');
    expect(log).toEqual(['ChildComponent', 'SomeDirective']);
  });

  it('should support host bindings', () => {
    type $MyApp$ = MyApp;

    @Directive({selector: '[hostBindingDir]'})
    class HostBindingDir {
      @HostBinding('id') dirId = 'some id';

      // NORMATIVE
      static ngDirectiveDef = $r3$.ɵdefineDirective({
        type: HostBindingDir,
        factory: function HostBindingDir_Factory() { return new HostBindingDir(); },
        hostBindings: function HostBindingDir_HostBindings(dirIndex: $number$, elIndex: $number$) {
          $r3$.ɵp(elIndex, 'id', $r3$.ɵb($r3$.ɵld<HostBindingDir>(dirIndex).dirId));
        }
      });
      // /NORMATIVE
    }

    const $e0_attrs$ = ['hostBindingDir', ''];
    const $e0_dirs$ = [HostBindingDir];

    @Component({
      selector: 'my-app',
      template: `
        <div hostBindingDir></div>
      `
    })
    class MyApp {
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyApp,
        tag: 'my-app',
        factory: function MyApp_Factory() { return new MyApp(); },
        template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, 'div', $e0_attrs$, $e0_dirs$);
            $r3$.ɵe();
          }
          HostBindingDir.ngDirectiveDef.h(1, 0);
          $r3$.ɵr(1, 0);
        }
      });
    }

    expect(renderComp(MyApp)).toEqual(`<div hostbindingdir="" id="some id"></div>`);
  });

  it('should support host listeners', () => {
    type $MyApp$ = MyApp;

    @Directive({selector: '[hostlistenerDir]'})
    class HostListenerDir {
      @HostListener('click')
      onClick() {}

      // NORMATIVE
      static ngDirectiveDef = $r3$.ɵdefineDirective({
        type: HostListenerDir,
        factory: function HostListenerDir_Factory() {
          const $dir$ = new HostListenerDir();
          $r3$.ɵL('click', function HostListenerDir_click_Handler(event: any) { $dir$.onClick(); });
          return $dir$;
        },
      });
      // /NORMATIVE
    }

    const $e0_attrs$ = ['hostListenerDir', ''];
    const $e0_dirs$ = [HostListenerDir];

    @Component({
      selector: 'my-app',
      template: `
        <button hostListenerDir>Click</button>
      `
    })
    class MyApp {
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyApp,
        tag: 'my-app',
        factory: function MyApp_Factory() { return new MyApp(); },
        template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, 'button', $e0_attrs$, $e0_dirs$);
            $r3$.ɵT(2, 'Click');
            $r3$.ɵe();
          }
          HostListenerDir.ngDirectiveDef.h(1, 0);
          $r3$.ɵr(1, 0);
        }
      });
    }

    expect(renderComp(MyApp)).toEqual(`<button hostlistenerdir="">Click</button>`);
  });


  it('should support setting of host attributes', () => {
    type $MyApp$ = MyApp;

    @Directive({selector: '[hostAttributeDir]', host: {'role': 'listbox'}})
    class HostAttributeDir {
      // NORMATIVE
      static ngDirectiveDef = $r3$.ɵdefineDirective({
        type: HostAttributeDir,
        factory: function HostAttributeDir_Factory() { return new HostAttributeDir(); },
        attributes: ['role', 'listbox']
      });
      // /NORMATIVE
    }

    const $e0_attrs$ = ['hostAttributeDir', ''];
    const $e0_dirs$ = [HostAttributeDir];

    @Component({
      selector: 'my-app',
      template: `
        <div hostAttributeDir></div>
      `
    })
    class MyApp {
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyApp,
        tag: 'my-app',
        factory: function MyApp_Factory() { return new MyApp(); },
        template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, 'div', $e0_attrs$, $e0_dirs$);
            $r3$.ɵe();
          }
          HostAttributeDir.ngDirectiveDef.h(1, 0);
          $r3$.ɵr(1, 0);
        }
      });
    }

    expect(renderComp(MyApp)).toEqual(`<div hostattributedir="" role="listbox"></div>`);
  });

  it('should support bindings of host attributes', () => {
    type $MyApp$ = MyApp;

    @Directive({selector: '[hostBindingDir]'})
    class HostBindingDir {
      @HostBinding('attr.aria-label') label = 'some label';

      // NORMATIVE
      static ngDirectiveDef = $r3$.ɵdefineDirective({
        type: HostBindingDir,
        factory: function HostBindingDir_Factory() { return new HostBindingDir(); },
        hostBindings: function HostBindingDir_HostBindings(dirIndex: $number$, elIndex: $number$) {
          $r3$.ɵa(elIndex, 'aria-label', $r3$.ɵb($r3$.ɵld<HostBindingDir>(dirIndex).label));
        }
      });
      // /NORMATIVE
    }

    const $e0_attrs$ = ['hostBindingDir', ''];
    const $e0_dirs$ = [HostBindingDir];

    @Component({
      selector: 'my-app',
      template: `
        <div hostBindingDir></div>
      `
    })
    class MyApp {
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyApp,
        tag: 'my-app',
        factory: function MyApp_Factory() { return new MyApp(); },
        template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, 'div', $e0_attrs$, $e0_dirs$);
            $r3$.ɵe();
          }
          HostBindingDir.ngDirectiveDef.h(1, 0);
          $r3$.ɵr(1, 0);
        }
      });
    }

    expect(renderComp(MyApp)).toEqual(`<div aria-label="some label" hostbindingdir=""></div>`);
  });

  it('should support onPush components', () => {
    type $MyApp$ = MyApp;
    type $MyComp$ = MyComp;

    @Component({
      selector: 'my-comp',
      template: `
        {{ name }}
      `,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    class MyComp {
      @Input() name: string;

      // NORMATIVE
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyComp,
        tag: 'my-comp',
        factory: function MyComp_Factory() { return new MyComp(); },
        template: function MyComp_Template(ctx: $MyComp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵT(0);
          }
          $r3$.ɵt(0, $r3$.ɵb(ctx.name));
        },
        inputs: {name: 'name'},
        changeDetection: ChangeDetectionStrategy.OnPush
      });
      // /NORMATIVE
    }

    @Component({
      selector: 'my-app',
      template: `
        <my-comp [name]="name"></my-comp>
      `
    })
    class MyApp {
      name = 'some name';

      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyApp,
        tag: 'my-app',
        factory: function MyApp_Factory() { return new MyApp(); },
        template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, MyComp);
            $r3$.ɵe();
          }
          $r3$.ɵp(0, 'name', $r3$.ɵb(ctx.name));
          MyComp.ngComponentDef.h(1, 0);
          $r3$.ɵr(1, 0);
        }
      });
    }

    expect(renderComp(MyApp)).toEqual(`<my-comp>some name</my-comp>`);
  });

  xit('should support structural directives', () => {
    type $MyComponent$ = MyComponent;

    const log: string[] = [];
    @Directive({
      selector: '[if]',
    })
    class IfDirective {
      constructor(template: TemplateRef<any>) { log.push('ifDirective'); }
      // NORMATIVE
      static ngDirectiveDef = $r3$.ɵdefineDirective({
        type: IfDirective,
        factory: () => new IfDirective($r3$.ɵinjectTemplateRef()),
      });
      // /NORMATIVE
    }

    // Important: keep arrays outside of function to not create new instances.
    // NORMATIVE
    const $e0_locals$ = ['foo', ''];
    const $c1_dirs$ = [IfDirective];
    // /NORMATIVE

    @Component(
        {selector: 'my-component', template: `<ul #foo><li *if>{{salutation}} {{foo}}</li></ul>`})
    class MyComponent {
      salutation = 'Hello';
      // NORMATIVE
      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyComponent,
        tag: 'my-component',
        factory: () => new MyComponent(),
        template: function(ctx: $MyComponent$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵE(0, 'ul', null, null, $e0_locals$);
            $r3$.ɵC(2, $c1_dirs$, C1);
            $r3$.ɵe();
          }
          let $foo$ = $r3$.ɵld<any>(1);
          $r3$.ɵcR(2);
          $r3$.ɵr(3, 2);
          $r3$.ɵcr();

          function C1(ctx1: $any$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, 'li');
              $r3$.ɵT(1);
              $r3$.ɵe();
            }
            $r3$.ɵt(1, $r3$.ɵi2('', ctx.salutation, ' ', $foo$, ''));
          }
        }
      });
      // /NORMATIVE
    }

    expect(renderComp(MyComponent)).toEqual('<child some-directive="">child-view</child>!');
    expect(log).toEqual(['ChildComponent', 'SomeDirective']);
  });

  describe('value composition', () => {
    type $MyArrayComp$ = MyArrayComp;

    @Component({
      selector: 'my-array-comp',
      template: `
          {{ names[0] }} {{ names[1] }}
      `
    })
    class MyArrayComp {
      @Input() names: string[];

      static ngComponentDef = $r3$.ɵdefineComponent({
        type: MyArrayComp,
        tag: 'my-array-comp',
        factory: function MyArrayComp_Factory() { return new MyArrayComp(); },
        template: function MyArrayComp_Template(ctx: $MyArrayComp$, cm: $boolean$) {
          if (cm) {
            $r3$.ɵT(0);
          }
          $r3$.ɵt(0, $r3$.ɵi2('', ctx.names[0], ' ', ctx.names[1], ''));
        },
        inputs: {names: 'names'}
      });
    }

    it('should support array literals of constants', () => {
      type $MyApp$ = MyApp;

      // NORMATIVE
      const $e0_arr$ = ['Nancy', 'Bess'];
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
        <my-array-comp [names]="['Nancy', 'Bess']"></my-array-comp>
      `
      })
      class MyApp {
        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, MyArrayComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(0, 'names', cm ? $e0_arr$ : $r3$.ɵNC);
            MyArrayComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp)).toEqual(`<my-array-comp>Nancy Bess</my-array-comp>`);
    });

    it('should support array literals of constants inside function calls', () => {
      type $MyApp$ = MyApp;

      // NORMATIVE
      const $e0_ff$ = () => ['Nancy', 'Bess'];
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
          <my-array-comp [names]="someFn(['Nancy', 'Bess'])"></my-array-comp>
        `
      })
      class MyApp {
        someFn(arr: string[]): string[] {
          arr[0] = arr[0].toUpperCase();
          return arr;
        }

        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, MyArrayComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(0, 'names', $r3$.ɵb(ctx.someFn($r3$.ɵf0($e0_ff$))));
            MyArrayComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp)).toEqual(`<my-array-comp>NANCY Bess</my-array-comp>`);
    });

    it('should support array literals of constants inside expressions', () => {
      type $MyApp$ = MyApp;
      type $MyComp$ = MyComp;

      @Component({selector: 'my-comp', template: `{{ num }}`})
      class MyComp {
        num: number;

        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyComp,
          tag: 'my-comp',
          factory: function MyComp_Factory() { return new MyComp(); },
          template: function MyComp_Template(ctx: $MyComp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵT(0);
            }
            $r3$.ɵt(0, $r3$.ɵb(ctx.num));
          },
          inputs: {num: 'num'}
        });
      }

      // NORMATIVE
      const $e0_ff$ = () => ['Nancy', 'Bess'];
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
          <my-comp [num]="['Nancy', 'Bess'].length + 1"></my-comp>
        `
      })
      class MyApp {
        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, MyComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(0, 'num', $r3$.ɵb($r3$.ɵf0($e0_ff$).length + 1));
            MyComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp)).toEqual(`<my-comp>3</my-comp>`);
    });


    it('should support array literals', () => {
      type $MyApp$ = MyApp;

      // NORMATIVE
      const $e0_ff$ = (v: any) => ['Nancy', v];
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
        <my-array-comp [names]="['Nancy', customName]"></my-array-comp>
      `
      })
      class MyApp {
        customName = 'Bess';

        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, MyArrayComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(0, 'names', $r3$.ɵb($r3$.ɵf1($e0_ff$, ctx.customName)));
            MyArrayComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp)).toEqual(`<my-array-comp>Nancy Bess</my-array-comp>`);
    });

    it('should support 9+ bindings in array literals', () => {
      type $MyComp$ = MyComp;

      @Component({
        selector: 'my-comp',
        template: `
          {{ names[0] }}
          {{ names[1] }}
          {{ names[3] }}
          {{ names[4] }}
          {{ names[5] }}
          {{ names[6] }}
          {{ names[7] }}
          {{ names[8] }}
          {{ names[9] }}
          {{ names[10] }}
          {{ names[11] }}
        `
      })
      class MyComp {
        @Input() names: string[];

        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyComp,
          tag: 'my-comp',
          factory: function MyComp_Factory() { return new MyComp(); },
          template: function MyComp_Template(ctx: $MyComp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵT(0);
              $r3$.ɵT(1);
              $r3$.ɵT(2);
              $r3$.ɵT(3);
              $r3$.ɵT(4);
              $r3$.ɵT(5);
              $r3$.ɵT(6);
              $r3$.ɵT(7);
              $r3$.ɵT(8);
              $r3$.ɵT(9);
              $r3$.ɵT(10);
              $r3$.ɵT(11);
            }
            $r3$.ɵt(0, $r3$.ɵb(ctx.names[0]));
            $r3$.ɵt(1, $r3$.ɵb(ctx.names[1]));
            $r3$.ɵt(2, $r3$.ɵb(ctx.names[2]));
            $r3$.ɵt(3, $r3$.ɵb(ctx.names[3]));
            $r3$.ɵt(4, $r3$.ɵb(ctx.names[4]));
            $r3$.ɵt(5, $r3$.ɵb(ctx.names[5]));
            $r3$.ɵt(6, $r3$.ɵb(ctx.names[6]));
            $r3$.ɵt(7, $r3$.ɵb(ctx.names[7]));
            $r3$.ɵt(8, $r3$.ɵb(ctx.names[8]));
            $r3$.ɵt(9, $r3$.ɵb(ctx.names[9]));
            $r3$.ɵt(10, $r3$.ɵb(ctx.names[10]));
            $r3$.ɵt(11, $r3$.ɵb(ctx.names[11]));
          },
          inputs: {names: 'names'}
        });
      }

      // NORMATIVE
      const $e0_ff$ =
          (v0: any, v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any,
           v8: any) => ['start-', v0, v1, v2, v3, v4, '-middle-', v5, v6, v7, v8, '-end'];
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
        <my-comp [names]="['start-', n0, n1, n2, n3, n4, '-middle-', n5, n6, n7, n8, '-end']">
        </my-comp>
      `
      })
      class MyApp {
        n0 = 'a';
        n1 = 'b';
        n2 = 'c';
        n3 = 'd';
        n4 = 'e';
        n5 = 'f';
        n6 = 'g';
        n7 = 'h';
        n8 = 'i';

        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(c: MyApp, cm: boolean) {
            if (cm) {
              $r3$.ɵE(0, MyComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(
                0, 'names',
                $r3$.ɵb($r3$.ɵfV($e0_ff$, [c.n0, c.n1, c.n2, c.n3, c.n4, c.n5, c.n6, c.n7, c.n8])));
            MyComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp)).toEqual(`<my-comp>start-abcde-middle-fghi-end</my-comp>`);
    });

    it('should support object literals', () => {
      type $ObjectComp$ = ObjectComp;
      type $MyApp$ = MyApp;

      @Component({
        selector: 'object-comp',
        template: `
          <p> {{ config['duration'] }} </p>
          <p> {{ config.animation }} </p>
        `
      })
      class ObjectComp {
        config: {[key: string]: any};

        static ngComponentDef = $r3$.ɵdefineComponent({
          type: ObjectComp,
          tag: 'object-comp',
          factory: function ObjectComp_Factory() { return new ObjectComp(); },
          template: function ObjectComp_Template(ctx: $ObjectComp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, 'p');
              $r3$.ɵT(1);
              $r3$.ɵe();
              $r3$.ɵE(2, 'p');
              $r3$.ɵT(3);
              $r3$.ɵe();
            }
            $r3$.ɵt(1, $r3$.ɵb(ctx.config['duration']));
            $r3$.ɵt(3, $r3$.ɵb(ctx.config.animation));
          },
          inputs: {config: 'config'}
        });
      }

      // NORMATIVE
      const $e0_ff$ = (v: any) => { return {'duration': 500, animation: v}; };
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
        <object-comp [config]="{'duration': 500, animation: name}"></object-comp>
      `
      })
      class MyApp {
        name = 'slide';

        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, ObjectComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(0, 'config', $r3$.ɵb($r3$.ɵf1($e0_ff$, ctx.name)));
            ObjectComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp)).toEqual(`<object-comp><p>500</p><p>slide</p></object-comp>`);
    });

    it('should support expressions nested deeply in object/array literals', () => {
      type $NestedComp$ = NestedComp;
      type $MyApp$ = MyApp;

      @Component({
        selector: 'nested-comp',
        template: `
          <p> {{ config.animation }} </p>
          <p> {{config.actions[0].opacity }} </p>
          <p> {{config.actions[1].duration }} </p>
        `
      })
      class NestedComp {
        config: {[key: string]: any};

        static ngComponentDef = $r3$.ɵdefineComponent({
          type: NestedComp,
          tag: 'nested-comp',
          factory: function NestedComp_Factory() { return new NestedComp(); },
          template: function NestedComp_Template(ctx: $NestedComp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, 'p');
              $r3$.ɵT(1);
              $r3$.ɵe();
              $r3$.ɵE(2, 'p');
              $r3$.ɵT(3);
              $r3$.ɵe();
              $r3$.ɵE(4, 'p');
              $r3$.ɵT(5);
              $r3$.ɵe();
            }
            $r3$.ɵt(1, $r3$.ɵb(ctx.config.animation));
            $r3$.ɵt(3, $r3$.ɵb(ctx.config.actions[0].opacity));
            $r3$.ɵt(5, $r3$.ɵb(ctx.config.actions[1].duration));
          },
          inputs: {config: 'config'}
        });
      }

      // NORMATIVE
      const $e0_ff$ = (v: any) => { return {opacity: 1, duration: v}; };
      const $c0$ = {opacity: 0, duration: 0};
      const $e0_ff_1$ = (v: any) => [$c0$, v];
      const $e0_ff_2$ = (v1: any, v2: any) => { return {animation: v1, actions: v2}; };
      // /NORMATIVE

      @Component({
        selector: 'my-app',
        template: `
        <nested-comp [config]="{animation: name, actions: [{ opacity: 0, duration: 0}, {opacity: 1, duration: duration }]}">
        </nested-comp>
      `
      })
      class MyApp {
        name = 'slide';
        duration = 100;

        // NORMATIVE
        static ngComponentDef = $r3$.ɵdefineComponent({
          type: MyApp,
          tag: 'my-app',
          factory: function MyApp_Factory() { return new MyApp(); },
          template: function MyApp_Template(ctx: $MyApp$, cm: $boolean$) {
            if (cm) {
              $r3$.ɵE(0, NestedComp);
              $r3$.ɵe();
            }
            $r3$.ɵp(
                0, 'config', $r3$.ɵf2(
                                 $e0_ff_2$, ctx.name,
                                 $r3$.ɵb($r3$.ɵf1($e0_ff_1$, $r3$.ɵf1($e0_ff$, ctx.duration)))));
            NestedComp.ngComponentDef.h(1, 0);
            $r3$.ɵr(1, 0);
          }
        });
        // /NORMATIVE
      }

      expect(renderComp(MyApp))
          .toEqual(`<nested-comp><p>slide</p><p>0</p><p>100</p></nested-comp>`);
    });

  });

});

function renderComp<T>(type: $r3$.ɵComponentType<T>): string {
  return toHtml(renderComponent(type));
}
