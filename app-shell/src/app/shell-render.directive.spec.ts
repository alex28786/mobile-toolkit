import {
  async,
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';

import { ShellRender } from './shell-render.directive';
import { APP_SHELL_RUNTIME_PROVIDERS, APP_SHELL_BUILD_PROVIDERS } from './is-prerender.service';
import {
  AppShellModule
} from './index';

@Component({
  selector: 'test-component',
  template: `<div *shellRender>Rendered</div>`
})
class TestComponent {}

describe('ShellRender Directive', () => {

  describe('prerender', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
	imports: [AppShellModule],
	providers: [APP_SHELL_BUILD_PROVIDERS],
	declarations: [TestComponent]
      });
      TestBed.compileComponents();
    });

    it('should render the element', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.childNodes.length).toBe(2);
      expect(fixture.debugElement.childNodes[0].nativeNode.textContent).toBe('template bindings={}');
      expect(fixture.debugElement.childNodes[1].nativeNode.textContent).toBe('Rendered');
    });
  });


  describe('runtime', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
	imports: [AppShellModule],
	providers: [APP_SHELL_RUNTIME_PROVIDERS],
	declarations: [TestComponent]
      });
      TestBed.compileComponents();
    });

    it('should NOT render the element', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.childNodes.length).toBe(1);
      expect(fixture.debugElement.childNodes[0].nativeNode.textContent).toBe('template bindings={}');
    });
  });
});


