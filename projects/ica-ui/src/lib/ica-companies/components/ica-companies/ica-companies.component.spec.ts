import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { IcaCompaniesComponent } from './ica-companies.component'

describe('IcaCompaniesComponent', () => {
  let component: IcaCompaniesComponent
  let fixture: ComponentFixture<IcaCompaniesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaCompaniesComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaCompaniesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
