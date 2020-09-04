import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      launches: [{}]
    }
  }

  // Get all launches and add to local array
  componentDidMount() {
    axios
      .get(`https://api.spacexdata.com/v3/launches/past`)
      .then(res => {
        this.setState({ launches: res.data })
        console.log(this.state.launches)
      })
      .catch(error => console.error(error))
  }

  render() {
   
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 

    let landedMissions = 0
    let f9Launches = 0
    let fHeavyLaunches = 0
    let f1Launches = 0
    let dragon1Flights = 0
    let crewDragonFlights = 0

    // Computer number of Starlink satellites in space
    const starlink =
    this.state.launches.filter(
      launch => launch.flight_number >= 1 ? launch.rocket.second_stage.payloads[0].payload_id.includes("Starlink") : null)
    
    // Compute number of successful landings on a landing vehicle
    const landSuccess =
    this.state.launches.filter(
      launch => launch.launch_success ? launch.rocket.first_stage.cores[0].landing_type : null) 

    landSuccess.forEach(launch => {
      launch.rocket.first_stage.cores.forEach(core => {
        if (core.land_success && core.landing_type !== 'Ocean') {
          landedMissions += 1;
        }
      })
    })

    // Compute number of Falcon 9 launches
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 && launch.rocket.rocket_id === 'falcon9') {
        f9Launches += 1;
      }
    })

    // Compute number of Falcon Heavy launches
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 && launch.rocket.rocket_id === 'falconheavy') {
        fHeavyLaunches += 1;
      }
    })

    // Compute number of Falcon 1 launches
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 && launch.rocket.rocket_id === 'falcon1') {
        f1Launches += 1;
      }
    })
    
    // Compute number of Dragon 1 flights
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 
        && launch.launch_success 
        && launch.rocket.second_stage.payloads[0].payload_type.includes('Dragon') 
        && launch.rocket.second_stage.payloads[0].payload_id.indexOf('Dragon Qualification Unit') === -1
        && launch.rocket.second_stage.payloads[0].payload_id.indexOf('Crew') === -1
        ) {
        dragon1Flights += 1;
      }
    })    

    // Compute number of Crew Dragon flights
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 
        && launch.launch_success 
        && launch.rocket.second_stage.payloads[0].payload_type.includes('Crew') 
        ) {
        crewDragonFlights += 1;
      }
    })    


   
  
      
    return (

      <div class="row">

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-space-shuttle fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of Starlink satellites in space:
                  <span class="pink-text text-pink accent-4">{starlink.length * 60} </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-space-shuttle fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of launches in total:
                  <span class="pink-text text-pink accent-4">{this.state.launches.length - 2}</span>
                  </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-check-square fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of successful landings:
                <span class="pink-text text-pink accent-4">{landedMissions}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-rocket fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of Falcon 1 launches:
                <span class="pink-text text-pink accent-4">{f1Launches}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-rocket fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of Falcon 9 launches:
                <span class="pink-text text-pink accent-4"> {f9Launches - 2} </span>
               </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-rocket fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of Falcon Heavy launches:
                <span class="pink-text text-pink accent-4"> {fHeavyLaunches} </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-rocket  fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of Dragon 1 launches :
                <span class="pink-text text-pink accent-4">  {dragon1Flights} </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m4 offset-m2 ">
          <div class="card-panel white z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s10">
                <i class=" fa fa-rocket fa-5x" ></i>
                <br />
                <span class="black-text">
                  № of Crew Dragon launches:
                <span class="pink-text text-pink accent-4"> {crewDragonFlights} </span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}
     

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps, null)(Stats)

