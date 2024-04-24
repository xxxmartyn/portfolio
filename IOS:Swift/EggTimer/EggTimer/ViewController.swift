//
//  ViewController.swift
//  EggTimer
//
//  Created by Angela Yu on 08/07/2019.
//  Copyright © 2019 The App Brewery. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {
    
    @IBOutlet weak var mainLabel: UILabel!
    @IBOutlet weak var timerProgressBar: UIProgressView!
    
    let eggTime = ["Soft": 300, "Medium": 420, "Hard": 720]
    var maxTime = 3
    var secondRemaining = 1
    var player: AVAudioPlayer!
    var timer = Timer()
    
    @IBAction func hardnesSelection(_ sender: UIButton) {
        let hardness = sender.currentTitle!
        
        timer.invalidate()
        timerProgressBar.progress = 0.0
        mainLabel.text = hardness
        
        maxTime = eggTime[hardness]!
        secondRemaining = eggTime[hardness]!
        
        timer =  Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(uppdateTimmer), userInfo: nil, repeats: true)
    }
    
     @objc func uppdateTimmer(){
        if secondRemaining > 0 {
            secondRemaining -= 1
            timerProgressBar.progress = Float(maxTime-secondRemaining) / Float(maxTime)
        } else{
            timer.invalidate()
             mainLabel.text = "DONE!"
            
            let url = Bundle.main.url(forResource: "alarm_sound", withExtension: "mp3")
            player = try! AVAudioPlayer(contentsOf: url!)
            player.play()
         }
    }

}
