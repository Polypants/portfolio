import React, { Component } from 'react';
import './Intro.css';
import BackgroundLines from '../BackgroundLines/BackgroundLines';
import VisibilitySensor from 'react-visibility-sensor';
import BABYLON from 'babylonjs';
import 'babylonjs-materials';
import classNames from 'classnames';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      isHintVisible: true
    };
  }

  onScroll = () => {
    var opacity = 1.2 - (window.scrollY / (window.innerHeight / 2));
    this.setState({ opacity: opacity });
    if (window.scrollY === 0 && this.state.isHintVisible === false) {
      this.setState({ isHintVisible: true });
    }
    if (window.scrollY > 0 && this.state.isHintVisible === true) {
      this.setState({ isHintVisible: false });
    }
  }

  onChange = (isVisible) => {
    // console.log(isVisible);
    this.props.onIntroVisibilityChange(isVisible);
  };

  componentDidMount() {
    var canvas = this.refs.Intro_canvas;
    var canvasCover = this.refs.Intro_canvasCover;
    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4( 0, 0, 0, 0 );
    scene.enablePhysics( new BABYLON.Vector3( 0, 0, 0 ), new BABYLON.OimoJSPlugin() );

    // create camera
    var camera = new BABYLON.TargetCamera( "camera", new BABYLON.Vector3( 0, window.innerHeight/27, 0 ), scene );
    camera.setTarget( BABYLON.Vector3.Zero() );

    // create light
    var ambientLight = new BABYLON.HemisphericLight( "ambientLight", new BABYLON.Vector3( 0, 0, 0 ), scene );
    ambientLight.intensity = 50;
    ambientLight.direction = new BABYLON.Vector3( 0, 1, 0 );

    // create icoSpheres
    var foregroundColor = new BABYLON.Color3.FromHexString( "#59b1ff" );
    var backgroundColor = new BABYLON.Color3.FromHexString( "#591dff" );
    var icoSphereVolume = ( window.innerWidth + window.innerHeight + 500 ) / 600;
    var maxIcoSpheres = 5;
    for ( var i = 0; i < maxIcoSpheres; i++ ) {
      var icoSphere = BABYLON.Mesh.CreateIcoSphere( "icoSphere", { radius: icoSphereVolume, subdivisions: 1 }, scene );
      icoSphere.position = new BABYLON.Vector3( Math.random(), Math.random(), Math.random() );
      icoSphere.physicsImpostor = new BABYLON.PhysicsImpostor( icoSphere, BABYLON.PhysicsImpostor.SphereImpostor, { move: true, mass: 10, friction: 0.1, restitution: 1 }, scene );
      var icoSphereMaterial = new BABYLON.GradientMaterial( "icoSphereMaterial", scene );
      icoSphereMaterial.topColor = foregroundColor;
      icoSphereMaterial.bottomColor = backgroundColor;
      icoSphere.material = icoSphereMaterial;
    }

    // create walls
    var wallThickness = 3;
    var wallWidth = window.innerWidth / 44;
    var wallHeight = window.innerHeight / 44;
  
    var wall_back = BABYLON.Mesh.CreateGround( "wall_back", -wallWidth, wallHeight, wallThickness, scene );
    wall_back.physicsImpostor = new BABYLON.PhysicsImpostor( wall_back, BABYLON.PhysicsEngine.BoxImpostor, { move: false, restitution: 0.3 }, scene );
    wall_back.position = new BABYLON.Vector3( 0, -wallHeight/2, 0 );
  
    var wall_front = BABYLON.Mesh.CreateGround( "wall_front", -wallWidth, wallHeight, wallThickness, scene );
    wall_front.physicsImpostor = new BABYLON.PhysicsImpostor( wall_front, BABYLON.PhysicsEngine.BoxImpostor, { move: false, restitution: 0.3 }, scene );
    wall_front.position = new BABYLON.Vector3( 0, wallHeight/2, 0 );
  
    var wall_right = BABYLON.Mesh.CreateGround( "wall_right", wallHeight, wallHeight, wallThickness, scene );
    wall_right.physicsImpostor = new BABYLON.PhysicsImpostor( wall_right, BABYLON.PhysicsEngine.BoxImpostor, { move: false, restitution: 0.3 }, scene ) ;
    wall_right.position = new BABYLON.Vector3( -wallWidth/2, 0, 0 );
    wall_right.rotation.z = Math.PI / 2;
  
    var wall_left = BABYLON.Mesh.CreateGround( "wall_left", -wallHeight, wallHeight, wallThickness, scene );
    wall_left.physicsImpostor = new BABYLON.PhysicsImpostor( wall_left, BABYLON.PhysicsEngine.BoxImpostor, { move: false, restitution: 0.3 }, scene );
    wall_left.position = new BABYLON.Vector3( wallWidth/2, 0, 0 );
    wall_left.rotation.z = Math.PI / 2;
  
    var wall_top = BABYLON.Mesh.CreateGround( "wall_top", wallWidth, wallHeight, wallThickness, scene );
    wall_top.physicsImpostor = new BABYLON.PhysicsImpostor( wall_top, BABYLON.PhysicsEngine.BoxImpostor, { move: false, restitution: 0.3 }, scene );
    wall_top.position = new BABYLON.Vector3( 0, 0, wallHeight/2 );
    wall_top.rotation.x = Math.PI / 2;
  
    var wall_bottom = BABYLON.Mesh.CreateGround( "wall_bottom", -wallWidth, wallHeight, wallThickness, scene );
    wall_bottom.physicsImpostor = new BABYLON.PhysicsImpostor( wall_bottom, BABYLON.PhysicsEngine.BoxImpostor, { move: false, restitution: 0.3 }, scene );
    wall_bottom.position = new BABYLON.Vector3( 0, 0, -wallHeight/2 );
    wall_bottom.rotation.x = Math.PI / 2;

    // create text
    // var textPlaneMat = new BABYLON.StandardMaterial( "textPlaneMat", scene );
    // textPlaneMat.emissiveTexture = new BABYLON.Texture( "hi.png", scene );
    // textPlaneMat.diffuseTexture = new BABYLON.Texture( "hi.png", scene );
    // textPlaneMat.diffuseTexture.hasAlpha = true;
    // textPlaneMat.disableLighting = true;
    // var textPlane = BABYLON.MeshBuilder.CreatePlane( "textPlane1", { width: 616/50, height: 422/50  }, scene );
    // textPlane.rotation.x = Math.PI/2;
    // textPlane.material = textPlaneMat;

    // setup gravity from mouse position
    canvasCover.addEventListener("mousemove", (e) => {
      var strength = 30;
      var posX = e.clientX / window.innerWidth;
      var posY = e.clientY / window.innerHeight;
      var gravX = ( posX - 0.5 ) * strength;
      var gravY = ( -posY + 0.5 ) * strength;
      scene.getPhysicsEngine().setGravity( new BABYLON.Vector3( gravX, 0, gravY ) );
    });

    // run render loop
    engine.runRenderLoop( () => {
      scene.render();
    });

    // resize scene when window is resized
    window.addEventListener( 'resize', () => {
      engine.resize();
    });

    window.addEventListener( 'scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    var scrollHintClasses = classNames('Intro_scrollHint', { 'Intro_scrollHint--visible': this.state.isHintVisible });
    return (
      <VisibilitySensor onChange={ this.onChange } partialVisibility={ true } offset={{ top: window.innerHeight * 0.8 }}>
        <div className="Intro">
          <BackgroundLines />
          <div style={{ opacity: this.state.opacity }} className="Intro_background"></div>
          <div className={ scrollHintClasses }>
            <h6 className="Intro_scrollHintText">Projects</h6>
            <div className="Intro_scrollHintLine"></div>
          </div>
          <canvas className="Intro_canvas" ref="Intro_canvas" style={{ opacity: this.state.opacity }}></canvas>
          <div className="Intro_canvasCover" ref="Intro_canvasCover"></div>
        </div>
      </VisibilitySensor>
    );
  }
}

export default Intro;
