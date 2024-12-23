export const setEmployeeCodeSession = (emp_no) => {
  sessionStorage.setItem("emp_no", emp_no);
  console.log(emp_no);
};

export const setEmployeeNameSession = (emp_name) => {
  sessionStorage.setItem("emp_name", emp_name);
};
export const setSimSession = (sim) => {
  sessionStorage.setItem("sim", sim);
};
export const setAssignSession = (assign) => {
  sessionStorage.setItem("assign", assign);
};
export const setCreatedealerSession = (cust) => {
  sessionStorage.setItem("cust", cust);
};

export const setEditAcesssSession = (edit_flag) => {
  sessionStorage.setItem("edit_flag", edit_flag);
};

export const setDepartmentSession = (emp_depart) => {
  sessionStorage.setItem("emp_depart", emp_depart);
};

export const setDesignationSession = (emp_desg) => {
  sessionStorage.setItem("emp_desg", emp_desg);
};

export const setIIotDashboardsession = (d_iot) => {
  sessionStorage.setItem("IIot_dash", d_iot);
};

export const setProjectsDashboardsession = (d_proj) => {
  sessionStorage.setItem("Proj_dash", d_proj);
};

export const setCostSavingDashboardsession = (d_cost) => {
  sessionStorage.setItem("cost_dash", d_cost);
};

export const setHardwaresoftwareDashboardsession = (d_hw) => {
  sessionStorage.setItem("Hw_SW_dash", d_hw);
};

export const setTimesheetDashboardsession = (d_prog) => {
  sessionStorage.setItem("time_dash", d_prog);
};

export const setServiceDashboardsession = (ser_dash) => {
  sessionStorage.setItem("ser_dash", ser_dash);
};
export const setProductionDashboardsession = (d_prod) => {
  sessionStorage.setItem("prod_dash", d_prod);
};
export const setTrackerAccesssession = (track) => {
  sessionStorage.setItem("track", track);
  console.log(track);
};
export const setIIotAccesssession = (Iot) => {
  sessionStorage.setItem("Iot", Iot);
};

// IIot Config Page

// Sim Inventory
export const setInventoryAccession = (sim_mas) => {
  sessionStorage.setItem("sim_mas", sim_mas);
};

//  Device Master
export const setDeviceMasterAccession = (dev_mas) => {
  sessionStorage.setItem("dev_mas", dev_mas);
};

export const setOrganisationAccession = (org_chart) => {
  sessionStorage.setItem("organisationScreen", org_chart);
  console.log(org_chart);
};
export const setCostsavingAccession = (cost_saving) => {
  sessionStorage.setItem("costsavingScreen", cost_saving);
  console.log(cost_saving);
};

export const setHardwaresoftwareRegisterAccesion = (hw_reg) => {
  sessionStorage.setItem("Registerscreen", hw_reg);
};
export const setHardwaresoftwareCloseAccesion = (hw_close) => {
  sessionStorage.setItem("Closescreen", hw_close);
};

export const setserviceCallRiseAcession = (ser_raise) => {
  sessionStorage.setItem("serviceregisterScreen", ser_raise);
};
export const setServiceCallCloseAccession = (ser_close) => {
  sessionStorage.setItem("servicecloseScreen", ser_close);
};

export const setTechDashAcession = (tech_dash) => {
  sessionStorage.setItem("techDashboardscreen", tech_dash);
};

export const setProductionG12Dashboard = (pro_G12) => {
  sessionStorage.setItem("productionScreen", pro_G12);
};

export const setKraAccession = (kra) => {
  sessionStorage.setItem("KraScreen", kra);
  console.log(kra);
};
export const shortageScreenAccession = (shrt) => {
  sessionStorage.setItem("shortageScreen", shrt);
  console.log(shrt);
};
export const monthlyScreenAccession = (m_plan) => {
  sessionStorage.setItem("monthlyPlanScreen", m_plan);
  console.log(m_plan);
};
export const XCMMscreenAccession = (xcmm) => {
  sessionStorage.setItem("XCMMscreen", xcmm);
  console.log(xcmm);
};
export const setplanDash = (d_prod_plan) => {
  sessionStorage.setItem("planDash", d_prod_plan);
  console.log(d_prod_plan);
};
export const setweekDashAccession = (d_prod_s) => {
  sessionStorage.setItem("prodweekDash", d_prod_s);
  console.log(d_prod_s);
};
export const setDeviceTracking = (device_track) => {
  sessionStorage.setItem("device_track", device_track);
  console.log(device_track);
};
// Function to set the title in sessionStorage
export const setTitleSession = (title) => {
  sessionStorage.setItem("currentTitle", title);
};

export const setServicePo = (ser_po) => {
  sessionStorage.setItem("ser_po", ser_po);
};

// Function to get the title from sessionStorage
export const getTitleSession = () => {
  return sessionStorage.getItem("currentTitle");
};

export const getEmployeeCode = () => {
  const emp_no = sessionStorage.getItem("emp_no");
  if (emp_no) return emp_no;
  else return null;
};

export const getEmployeeName = () => {
  const emp_name = sessionStorage.getItem("emp_name");
  if (emp_name) return emp_name;
  else return null;
};

export const getSim = () => {
  const sim = sessionStorage.getItem("sim");
  if (sim) return sim;
  else return null;
};
export const getAssign = () => {
  const assign = sessionStorage.getItem("assign");
  if (assign) return assign;
  else return null;
};
export const getCust = () => {
  const cust = sessionStorage.getItem("cust");
  if (cust) return cust;
  else return null;
};
export const getEditAcess = () => {
  const edit_flag = sessionStorage.getItem("edit_flag");
  if (edit_flag) return edit_flag;
  else return null;
};

export const getDepartment = () => {
  const emp_depart = sessionStorage.getItem("emp_depart");
  if (emp_depart) return emp_depart;
  else return null;
};

export const getDesignation = () => {
  const emp_desg = sessionStorage.getItem("emp_desg");
  if (emp_desg) return emp_desg;
  else return null;
};
export const getProjectAccess = () => {
  const project = sessionStorage.getItem("Proj_dash");
  if (project) return project;
  else return null;
};
export const gettrackerAccess = () => {
  const track = sessionStorage.getItem("track");
  if (track) return track;
  else return null;
};
export const getCostsavingAccess = () => {
  const saving = sessionStorage.getItem("costsavingScreen");
  if (saving) return saving;
  else return null;
};
export const getOrganisationAccess = () => {
  const organization = sessionStorage.getItem("organisationScreen");
  if (organization) return organization;
  else return null;
};

export const getServiceAccess = () => {
  const serviceDash = sessionStorage.getItem("ser_dash");
  if (serviceDash) return serviceDash;
  else return null;
};
export const getServiceAccessRise = () => {
  const serviceRise = sessionStorage.getItem("serviceregisterScreen");
  if (serviceRise) return serviceRise;
  else return null;
};
export const getServiceAccessClose = () => {
  const serviceClose = sessionStorage.getItem("sevicecloseScreen");
  if (serviceClose) return serviceClose;
  else return null;
};
export const getTechDashAccess = () => {
  const techDash = sessionStorage.getItem("techDashboardscreen");
  if (techDash) return techDash;
  else return null;
};
export const getProductionG12Access = () => {
  const ProductionG12 = sessionStorage.getItem("productionScreen");
  if (ProductionG12) return ProductionG12;
  else return null;
};

export const getKraAccess = () => {
  const KRA = sessionStorage.getItem("KraScreen");

  if (KRA) return KRA;
  else return null;
};
export const getShortageScreen = () => {
  const shrt = sessionStorage.getItem("shortageScreen");

  if (shrt) return shrt;
  else return null;
};

export const getmonthlyPlan = () => {
  const monthlyPlan = sessionStorage.getItem("monthlyPlanScreen");

  if (monthlyPlan) return monthlyPlan;
  else return null;
};

export const getWeekDash = () => {
  const prodweekDash = sessionStorage.getItem("prodweekDash");

  if (prodweekDash) return prodweekDash;
  else return null;
};
export const getMonthlyplanDash = () => {
  const planDash = sessionStorage.getItem("planDash");

  if (planDash) return planDash;
  else return null;
};
export const getDeviceTrack = () => {
  const deviceTrack = sessionStorage.getItem("device_track");

  if (deviceTrack) return deviceTrack;
  else return null;
};
export const getServicePo = () => {
  const ser_po = sessionStorage.getItem("ser_po");
  if (ser_po) return ser_po;
  else return null;
};

export const getInventoryAccession = () => {
  const sim_mas = sessionStorage.getItem("sim_mas");
  if (sim_mas) return sim_mas;
  else return null;
};

export const getDeviceMasterAccession = () => {
  const dev_mas = sessionStorage.getItem("dev_mas");
  if (dev_mas) return dev_mas;
  else return null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem("emp_no");
  sessionStorage.removeItem("emp_name");
  sessionStorage.removeItem("emp_depart");
  sessionStorage.removeItem("emp_desg");
  localStorage.clear();
  sessionStorage.clear();
};
