import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcaContractPreviewSymbolOverlayComponent } from './ica-contract-preview-symbol-overlay.component';

describe('IcaContractPreviewSymbolOverlayComponent', () => {
  let component: IcaContractPreviewSymbolOverlayComponent;
  let fixture: ComponentFixture<IcaContractPreviewSymbolOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractPreviewSymbolOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractPreviewSymbolOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
